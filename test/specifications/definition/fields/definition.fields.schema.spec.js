require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/definition/fields/definition.fields.schema.json')
const dataObject = require('~/test/specifications/definition/fields/definition.fields.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/definition/fields/definition.fields.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
