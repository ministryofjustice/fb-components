require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/panel/panel.schema.json')
const dataObject = require('~/test/specifications/panel/panel.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/panel/panel.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
