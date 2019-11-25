require('module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObject = require('~/test/components-core/specifications/definition/condition/boolean/definition.condition.boolean.json')
const jsonSchema = require('~/components-core/specifications/definition/condition/boolean/definition.condition.boolean.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/components-core/specifications/definition/condition/boolean/definition.condition.boolean.schema.json', () => {
  describe('The data object', () => it('has properties', () => expect(dataObject).not.to.be.empty))

  describe('The json schema', () => it('validates the data object', () => expect(validator(dataObject)).to.be.true))
})
