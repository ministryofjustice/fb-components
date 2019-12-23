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
    },
    'preact'
  ]
]

const plugins = [
  '@babel/proposal-class-properties',
  [
    '@babel/plugin-transform-react-jsx', {
      pragma: 'h'
    }
  ]
]

module.exports = (api) => {
  api.cache.using(() => NODE_ENV)

  return {
    presets,
    plugins
  }
}
