require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObject = require('~/metadata/string/fileupload.slot.button.remove.json')
const jsonSchema = require('~/specifications/string/string.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/metadata/string/fileupload.slot.button.remove.json', () => {
  it('has properties', () => expect(dataObject).not.to.be.empty)

  it('validates the data object', () => expect(validator(dataObject)).to.be.true)
})
