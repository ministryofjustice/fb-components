require('module-alias/register')

const path = require('path')
const glob = require('glob-all')

module.exports = glob
  .sync('./components-core/specifications/**/*/*.schema.json')
  .reduce((accumulator, f) => accumulator.concat(require(path.resolve(f))), [])
