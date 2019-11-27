require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/filetype/filetype.schema.json')
const dataObject = require('~/test/specifications/filetype/filetype.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/filetype/filetype.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
