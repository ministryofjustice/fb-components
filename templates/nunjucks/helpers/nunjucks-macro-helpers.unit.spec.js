const {
  test
} = require('tap')
const nunjucksMacroHelpers = require('./nunjucks-macro-helpers')
const {initEnv, defaultViewPaths} = require('./spec/load-nunjucks')
const getEnv = initEnv(nunjucksMacroHelpers)

test('When nunjucks-macro-helpers is required', t => {
  t.ok(nunjucksMacroHelpers.setObject, 'it should export the setObject method')
  t.ok(nunjucksMacroHelpers.setObjectProperty, 'it should export the setObjectProperty method')

  t.end()
})

test('When addGlobal is called', t => {
  const nunjucksEnv = getEnv()
  nunjucksEnv.renderString('{{ addGlobal("foo", "bar") }}')
  const output = nunjucksEnv.renderString('{{ foo }}')
  t.equals(output, 'bar', 'it should set the global variable correctly')

  t.end()
})

test('When setObject is called', t => {
  const nunjucksEnv = getEnv()
  const output = nunjucksEnv.renderString('{% set foo = {bar:"baz"} %}{% set foo = setObject(foo, {nubar:"nubaz"}) %}{{ foo.nubar }}')
  t.equals(output, 'nubaz', 'it should return the updated object')

  t.end()
})

test('When setObjectProperty is called', t => {
  const nunjucksEnv = getEnv()
  const output = nunjucksEnv.renderString('{% set foo = {bar:"baz"} %}{% set foo = setObjectProperty(foo, "nubar", "nubaz") %}{{ foo.nubar }}')
  t.equals(output, 'nubaz', 'it should return the updated object')

  t.end()
})

test('When JSON filter is invoked', t => {
  const nunjucksEnv = getEnv()
  const output = nunjucksEnv.renderString('{% set obj = {foo:"bar"} %}{{ obj | json | safe}}')
  t.equals(output, '{"foo":"bar"}', 'it should jsonify the data')

  t.end()
})

test('When JSON method is called', t => {
  const nunjucksEnv = getEnv()
  const output = nunjucksEnv.renderString('{{ JSON({foo:\'bar\'}) | safe }}')
  t.equals(output, '{"foo":"bar"}', 'it should jsonify the data')

  t.end()
})

test('When callMacro is invoked', t => {
  const nunjucksEnv = getEnv(defaultViewPaths)

  const outputA = nunjucksEnv.renderString('{{ callMacro("a") }}')
  t.equals(outputA.trim(), 'Contents of a', 'it should render macro')

  const outputB = nunjucksEnv.renderString('{{ callMacro("b") }}')
  t.equals(outputB.trim(), 'Contents of b\nContents of a', 'it should render macro which calls another macro')

  const outputC = nunjucksEnv.renderString('{{ callMacro("c", {greeting:"hello"}) }}')
  t.equals(outputC.trim(), 'Contents of c - hello', 'it should render macro using passed params')

  const outputD = nunjucksEnv.renderString('{{ callMacro("d") }}')
  t.equals(outputD.trim(), 'Contents of namespaced a', 'it should render macro which calls another, namespaced macro')

  const outputEA = nunjucksEnv.renderString('{{ callMacro("e.a") }}')
  t.equals(outputEA.trim(), 'Contents of e.a', 'it should render macro with path defined by its folder hierarchy')

  const outputAA = nunjucksEnv.renderString('{{ callMacro("a.a") }}')
  t.equals(outputAA.trim(), 'Contents of a.a', 'it should render macro whose path overlaps with an existing macro')

  const outputF = nunjucksEnv.renderString('{% call callMacro("f") %}Caller contents{% endcall %}')
  t.equals(outputF.trim(), 'Contents of f\nCaller contents', 'it should render macro which contains called content')

  const outputNamespacedA = nunjucksEnv.renderString('{{ callMacro("foo.a") }}')
  t.equals(outputNamespacedA.trim(), 'Contents of namespaced a', 'it should render namespaced macro')

  const outputNamespacedAA = nunjucksEnv.renderString('{{ callMacro("foo.a.a") }}')
  t.equals(outputNamespacedAA.trim(), 'Contents of namespaced a.a', 'it should render namespaced macro with path defined by its folder hierarchy')

  const outputNamespacedB = nunjucksEnv.renderString('{{ callMacro("foo.b") }}')
  t.equals(outputNamespacedB.trim(), 'Contents of namespaced b\nContents of b\nContents of a', 'it should render macro which calls another macro')

  // TODO: option to fail hard
  // TODO: option to log
  const outputNoPath = nunjucksEnv.renderString('{{ callMacro("nopath") }}')
  t.equals(outputNoPath.trim(), 'Component nopath does not exist', 'it should handle macro calls when macros do not exist')

  t.end()
})
