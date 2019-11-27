require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/page/confirmation/page.confirmation.schema.json')
const dataObject = require('~/test/specifications/page/confirmation/page.confirmation.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/page/confirmation/page.confirmation.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
