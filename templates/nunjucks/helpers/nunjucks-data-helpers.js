const Markdown = require('markdown-it')()

// helper functions to paper over model inconsitencies
const setError = data => {
  if (data.error && !data.errorMessage) {
    data.errorMessage = {
      html: data.error
    }
  }
  return data
}

// mappings for sizes and classes
let mappings = {}

const checkPropObject = (data, prop) => {
  data = JSON.parse(JSON.stringify(data))
  if (data[prop] && typeof data[prop] === 'string') {
    data[prop] = {
      html: data[prop]
    }
  }
  if (data[prop]) {
    if (data._id) {
      data[prop].attributes = Object.assign({}, data[prop].attributes, {
        'data-block-id': data._id,
        'data-block-property': prop
      })
    }
  }

  if (data[prop]) {
  // only do this if classes undefined?
    const propSizeMappings = mappings[prop]
    if (propSizeMappings) {
      if (data[prop].classes) {
        data[prop].classes += ' '
      } else {
        data[prop].classes = ''
      }
      const questionSizeClass = data[prop].isPageHeading ? propSizeMappings.single : propSizeMappings.multiple
      data[prop].classes += questionSizeClass
    }
  }
  return data
}

const setLabel = data => {
  data.id = data.id || data._id
  data = checkPropObject(data, 'label')
  data = checkPropObject(data, 'hint')
  return data
}

// classes: params.fieldset.classes,
// attributes: params.fieldset.attributes,
const setItemsLabel = data => {
  data = JSON.parse(JSON.stringify(data))
  try {
    data = setLabel(data)
    data.legend = data.legend || data.label
    data = checkPropObject(data, 'legend')
    data.fieldset = data.fieldset || {}
    if (data.legend) {
      data.fieldset = Object.assign({}, data.fieldset, {
        legend: data.legend
      }, {
        attributes: data.legend.attributes
      })
    }
    if (data.hint) {
      data.fieldset = Object.assign({}, data.fieldset, {
        hint: data.hint
      })
    }

    if (data.error) {
      data.fieldset.errorMessage = {
        html: data.error
      }
    }
    data = Object.assign(data, data.fieldset)
    data.items = data.items || []
    data.items = data.items.map((item, index) => {
      // console.log('updating items', item)
      let hint = item.hint
      if (hint && !hint.html) {
        hint = {html: hint}
      }
      let itemId = item.id || item.name
      if (!itemId && data.name) {
        itemId = `${data.name}-${index}`
      }
      let html = item.text ? item.text : item.html
      html = html || item.label
      const id = itemId ? itemId.replace(/\./g, '--') : undefined
      const updatedItem = Object.assign({}, item, {
        id,
        html,
        hint
      })
      if (data._type !== 'date') {
        updatedItem.attributes = Object.assign({}, updatedItem.attributes, {
          'data-block-id': item._id,
          'data-block-type': item._type
        })
        updatedItem.label = {
          attributes: {
            'data-block-id': item._id,
            'data-block-property': 'label'
          }
        }
        if (updatedItem.hint) {
          updatedItem.hint.attributes = {
            'data-block-id': item._id,
            'data-block-property': 'hint'
          }
        }
      }
      return updatedItem
    })
  } catch (e) {
    // console.log(e)
  }
  if (data.items) {
    const dividerItems = []
    data.items.forEach(item => {
      let divider = item.divider
      if (!divider && item.hasDivider) {
        divider = 'or'
      }
      if (divider) {
        dividerItems.push({
          divider
        })
        delete item.divider
      }
      dividerItems.push(item)
    })
    data.items = dividerItems
  }
  if (data.legend) {
    delete data.legend.attributes
    delete data.legend
  }
  if (data.fieldset && data.fieldset.legend) {
    delete data.fieldset.legend.attributes
  }
  delete data.attributes

  return data
}

const setContent = (data, prop) => {
  prop = prop || 'html'
  if (data[prop]) {
    data[prop] = Markdown.render(data[prop]).trim()
  }
  return data
}

const setMainEditableInstanceProperty = (data, property) => {
  data = JSON.parse(JSON.stringify(data))
  data.attributes = data.attributes || {}
  data.attributes['data-block-property-instance'] = property
  return data
}

const handleWidthClass = (data, prop, def) => {
  if (!data[prop] && def) {
    data[prop] = def
  }
  if (!data[prop]) {
    return data
  }
  const widthDelimiter = parseInt(data[prop], 10) > 0 ? 'input--' : '!-'
  data.classes = data.classes ? `${data.classes} ` : ''
  data.classes += `govuk-${widthDelimiter}width-${data[prop]}`
  return data
}

// Handle width classes
const setWidthClass = (data, def) => {
  return handleWidthClass(data, 'widthClass', def)
}
const setInputWidthClass = (data, def) => {
  return handleWidthClass(data, 'widthClassInput', def)
}

const init = (env, options = {}) => {
  const nunjucksEnv = env

  if (options.mappings) {
    mappings = options.mappings
  }

  const njkGlobals = {
    setError,
    setLabel,
    setItemsLabel,
    setContent,
    setWidthClass,
    setInputWidthClass,
    setMainEditableInstanceProperty
  }

  Object.entries(njkGlobals).forEach(([key, value]) => {
    nunjucksEnv.addGlobal(key, value)
  })

  return nunjucksEnv
}

module.exports = {
  init,
  setError,
  setLabel,
  setItemsLabel,
  setContent,
  setWidthClass,
  setInputWidthClass,
  setMainEditableInstanceProperty
}
