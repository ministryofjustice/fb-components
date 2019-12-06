require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/string/string.schema.json')
const dataObject = require('~/metadata/string/upload.file.type.application.vnd.ms-excel.sheet.macroEnabled.12.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/metadata/string/upload.file.type.application.vnd.ms-excel.sheet.macroEnabled.12.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))