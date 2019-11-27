require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/header/header.schema.json')
const dataObject = require('~/test/specifications/header/header.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/header/header.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
