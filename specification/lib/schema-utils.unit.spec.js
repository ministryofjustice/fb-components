const test = require('tape')
const path = require('path')

const schemaUtils = require('./schema-utils')

test('When loading schemas from a single path and $idRoot', t => {
  t.plan(1)

  const {load} = schemaUtils([{
    path: path.resolve(__dirname, '../data/specs-a'),
    $idRoot: 'http://gov.uk/schema/v1.0.0',
    protected: ['condition']
  }])

  const expected = require(path.resolve(__dirname, '../data/expected/specs-a-expected.json'))
  load().then(schemas => {
    t.deepEqual(schemas, expected, 'it should return the correctly expanded and dereferenced schemas')
  })
})

test('When loading schemas from multiple paths and $idRoots', t => {
  t.plan(1)

  const {load} = schemaUtils([
    {
      path: path.resolve(__dirname, '../data/specs-a'),
      $idRoot: 'http://gov.uk/schema/v1.0.0',
      protected: ['condition']
    },
    {
      path: path.resolve(__dirname, '../data/specs-b'),
      $idRoot: 'http://gov.uk/schema/v1.0.0/namespace'
    }
  ])

  const expected = require(path.resolve(__dirname, '../data/expected/specs-b-expected.json'))
  load().then(schemas => {
    t.deepEqual(schemas, expected, 'it should return the correctly expanded and dereferenced schemas')
  })
})

test('When loading schemas with conflicting property values', t => {
  t.plan(1)

  const {load} = schemaUtils([{
    path: path.resolve(__dirname, '../data/specs-overrides'),
    $idRoot: 'http://gov.uk/schema/v1.0.0'
  }])

  const expected = require(path.resolve(__dirname, '../data/expected/specs-overrides-expected.json'))
  load().then(schemas => {
    t.deepEqual(schemas, expected, 'it should return the schemas with correctly overridden properties')
  })
})

test('When loading schemas with schemas that do not resolve', t => {
  t.plan(3)

  const {load} = schemaUtils([{
    path: path.resolve(__dirname, '../data/specs-error'),
    $idRoot: 'http://xgov.uk/schema/v1.0.0'
  }])

  load().catch(e => {
    t.equal(e.name, 'FBSchemaError')
    t.equal(e.message, 'Could not load error.bar')
    t.equal(e.code, 'MODULE_NOT_FOUND')
  })
})
