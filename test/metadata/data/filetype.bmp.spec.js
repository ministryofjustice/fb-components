require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/filetype/filetype.schema.json')
const dataObject = require('~/metadata/data/filetype.bmp.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/metadata/data/filetype.bmp.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
