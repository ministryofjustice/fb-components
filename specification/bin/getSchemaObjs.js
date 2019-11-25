const path = require('path')

const getSchemaObjs = () => {
  const schemaObjs = []
  try {
    const specsPath = process.cwd()
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
