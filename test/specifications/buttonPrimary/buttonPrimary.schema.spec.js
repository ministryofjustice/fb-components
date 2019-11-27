require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/buttonPrimary/buttonPrimary.schema.json')
const dataObject = require('~/test/specifications/buttonPrimary/buttonPrimary.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/buttonPrimary/buttonPrimary.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
