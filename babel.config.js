const {
  env: {
    NODE_ENV = 'development'
  }
} = process

const presets = [
  [
    '@babel/env', {
      useBuiltIns: 'entry',
      targets: 'last 2 versions',
      corejs: 3
    }
  ]
]

module.exports = (api) => {
  api.cache.using(() => NODE_ENV)

  return {
    presets
  }
}
