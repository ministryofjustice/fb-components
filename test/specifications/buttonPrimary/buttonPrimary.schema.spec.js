require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObject = require('~/test/specifications/buttonPrimary/buttonPrimary.json')
const jsonSchema = require('~/specifications/buttonPrimary/buttonPrimary.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/buttonPrimary/buttonPrimary.schema.json', () => {
  describe('The data object', () => it('has properties', () => expect(dataObject).not.to.be.empty))

  describe('The json schema', () => it('validates the data object', () => expect(validator(dataObject)).to.be.true))
})
