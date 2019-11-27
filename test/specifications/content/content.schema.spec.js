require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/content/content.schema.json')
const dataObject = require('~/test/specifications/content/content.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/content/content.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
