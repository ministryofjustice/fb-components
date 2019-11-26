const path = require('path')
const glob = require('glob-promise')
const nunjucks = require('nunjucks')

const macrosPath = path.resolve('./templates/nunjucks/helpers/spec/macros')
const unnamespacedPath = path.join(macrosPath, 'unnamespaced')
const namespacedPath = path.join(macrosPath, 'namespaced')

const defaultViewPaths = [
  unnamespacedPath,
  {
    path: namespacedPath,
    namespace: 'foo'
  }
]

const initEnv = (fn) => {
  const getEnv = (viewPaths = []) => {
    let nunjucksEnv = nunjucks.configure(viewPaths.map(viewPath => {
      return viewPath.path ? viewPath.path : viewPath
    }), {
      trimBlocks: true,
      lstripBlocks: true
    })

    nunjucksEnv = fn.init(nunjucksEnv)

    viewPaths.forEach(viewPath => {
      const namespace = viewPath.namespace
      const path = viewPath.path || viewPath

      // const macrosPathRegex = new RegExp(`.*${viewPath}/`)
      const macroPaths = glob.sync(`${path}/**/*.njk`)
      // .map(path => path.replace(macrosPathRegex, ''))
      nunjucksEnv.addMacros(macroPaths, namespace)
    })

    return nunjucksEnv
  }

  return getEnv
}

module.exports = {
  initEnv,
  defaultViewPaths
}
