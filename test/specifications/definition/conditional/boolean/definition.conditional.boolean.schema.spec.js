require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const jsonSchema = require('~/fb-components/specifications/definition/conditional/boolean/definition.conditional.boolean.schema.json')
const dataObject = require('~/fb-components/test/specifications/definition/conditional/boolean/definition.conditional.boolean.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

xdescribe('~/fb-components/specifications/definition/conditional/boolean/definition.conditional.boolean.schema.json', () => {
  describe('The data object', () => it('has properties', () => expect(dataObject).not.to.be.empty))

  describe('The json schema', () => it('validates the data object', () => expect(validator(dataObject)).to.be.true))
})
