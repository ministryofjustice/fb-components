require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/button/button.schema.json')
const dataObject = require('~/test/specifications/button/button.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/button/button.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
