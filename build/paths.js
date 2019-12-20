const path = require('path')

const currentDir = process.cwd()

module.exports = {
  currentDir,
  sourcePath: path.resolve(currentDir, 'build/assets'),
  targetPath: path.resolve(currentDir, 'assets'),
  assetsPath: path.resolve(currentDir, 'node_modules/govuk-frontend/govuk/assets')
}
