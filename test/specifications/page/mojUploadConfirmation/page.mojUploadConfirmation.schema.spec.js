require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/page/mojUploadConfirmation/page.mojUploadConfirmation.schema.json')
const dataObject = require('~/test/specifications/page/mojUploadConfirmation/page.mojUploadConfirmation.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/page/mojUploadConfirmation/page.mojUploadConfirmation.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
