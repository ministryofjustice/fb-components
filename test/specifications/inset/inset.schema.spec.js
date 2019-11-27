require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/inset/inset.schema.json')
const dataObject = require('~/test/specifications/inset/inset.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/inset/inset.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
