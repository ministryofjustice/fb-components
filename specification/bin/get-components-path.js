const path = require('path')

function getComponentsPath () {
  let componentsPath
  try {
    componentsPath = path.dirname(require.resolve('@ministryofjustice/fb-components'))
  } catch (e) {
    componentsPath = process.cwd()
  }
  return componentsPath
}

module.exports = getComponentsPath
