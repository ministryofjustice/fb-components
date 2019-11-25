
const setObject = (...args) => {
  const objArgs = args.slice()
  objArgs.unshift({})
  return Object.assign.apply(null, objArgs)
}

// Allow object properties to be updated individually
const setObjectProperty = (obj, prop, val) => {
  return Object.assign({}, obj, {[prop]: val})
}

const init = (env) => {
  if (!env) {
    throw new Error('No nunjucks environment passed')
  }
  const nunjucksEnv = env

  // Allow json filtering and more complex dumping
  nunjucksEnv.addFilter('json', JSON.stringify)
  nunjucksEnv.addGlobal('JSON', JSON.stringify)

  // Allow objects to be updated
  nunjucksEnv.addGlobal('setObject', setObject)

  // Allow object properties to be updated individually
  nunjucksEnv.addGlobal('setObjectProperty', setObjectProperty)

  // Allow globals to be added from within macros
  // needed to register macros at start time
  nunjucksEnv.addGlobal('addGlobal', (prop, val) => {
    nunjucksEnv.addGlobal(prop, val)
  })

  const add = (macroPaths, namespace) => {
    if (!nunjucksEnv) {
      throw new Error('No nunjucksEnv found')
    }
    const adjustedMacroPaths = macroPaths.map(macroPath => {
      let macroNamespace = namespace
      // let macroNjk = macroPath.replace(/.*\/template\/nunjucks\/(.+)\.njk?$/, '$1')
      // let macroNjk = macroPath.replace(/.*\/(.+)\.njk?$/, '$1')
      const macroNjk = macroPath.replace(/.*\/(.+)\.njk$/, '$1')
      const macroNamespaceSuffix = macroNjk.includes('.') ? macroNjk.replace(/\.[^.]+$/, '') : ''
      if (macroNamespaceSuffix) {
        macroNamespace = macroNamespace ? `${macroNamespace}.` : ''
        macroNamespace += macroNamespaceSuffix
      }
      return {
        path: macroPath,
        namespace: macroNamespace
      }
    })

    adjustedMacroPaths.forEach(macroObj => {
      nunjucksEnv.renderString(`
        {% import '${macroObj.path}' as importedMacros %}
        {{ addMacros(importedMacros${macroObj.namespace ? `, '${macroObj.namespace}'` : ''}) }}
      `, {})
    })
  }

  nunjucksEnv.addMacros = add

  // Object to store macros in
  const macros = {}

  const addMacro = (key, val) => {
    addMacros({[key]: val})
  }

  const addMacros = (obj, namespace) => {
    const newMacros = Object.assign({}, obj)
    if (namespace) {
      Object.keys(newMacros).forEach(key => {
        // access by string
        newMacros[`${namespace}.${key}`] = newMacros[key]
        delete newMacros[key]
      })
    }
    Object.keys(newMacros).forEach(key => {
      if (key.startsWith('govuk')) {
        nunjucksEnv.addGlobal(key, newMacros[key])
      }
    })
    Object.assign(macros, newMacros)
  }

  nunjucksEnv.addGlobal('$macros', macros)
  nunjucksEnv.addGlobal('addMacro', addMacro)
  nunjucksEnv.addGlobal('addMacros', addMacros)

  nunjucksEnv.renderString(`
{% macro callMacro(path, data) -%}
{% if $macros[path] -%}
{% if caller -%}
{% call $macros[path](data) -%}
{{ caller() }}
{%- endcall %}
{%- else -%}
{{ $macros[path](data) }}
{%- endif %}
{%- else -%}
Component {{path}} does not exist
{%- endif %}
{%- endmacro %}
{{ addGlobal('callMacro', callMacro) }}
  `)

  return nunjucksEnv
}

module.exports = {
  init,
  setObject,
  setObjectProperty
}
