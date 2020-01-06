require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const jsonSchema = require('~/fb-components/specifications/fileupload/fileupload.schema.json')
const dataObject = require('~/fb-components/test/specifications/fileupload/fileupload.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/specifications/fileupload/fileupload.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
