require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/radio/radio.schema.json')
const dataObject = require('~/test/specifications/radio/radio.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/radio/radio.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
