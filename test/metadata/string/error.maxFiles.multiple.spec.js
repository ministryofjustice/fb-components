require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/string/error/string.error.schema.json')
const dataObject = require('~/metadata/string/error.maxFiles.multiple.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/metadata/string/error.maxFiles.multiple.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))