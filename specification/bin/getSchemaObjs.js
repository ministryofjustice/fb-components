const path = require('path')

const getSchemaObjs = (specsPath = process.cwd()) => {
  const schemaObjs = []
  try {
    const packageJSON = require(path.join(specsPath, 'package.json'))
    const specs = packageJSON.specifications
    specs.path = specsPath
    schemaObjs.push(specs)
  } catch (e) {
    // no package.json
  }
  return schemaObjs
}

module.exports = getSchemaObjs
