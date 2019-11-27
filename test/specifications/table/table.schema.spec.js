require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/table/table.schema.json')
const dataObject = require('~/test/specifications/table/table.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/table/table.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
