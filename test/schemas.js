require('@ministryofjustice/module-alias/register')

const path = require('path')
const glob = require('glob-all')

module.exports = glob
  .sync('./specifications/**/*/*.schema.json')
  .reduce((accumulator, f) => accumulator.concat(require(path.resolve(f))), [])
