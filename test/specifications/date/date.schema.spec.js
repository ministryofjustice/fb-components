require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/date/date.schema.json')
const dataObject = require('~/test/specifications/date/date.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/date/date.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
