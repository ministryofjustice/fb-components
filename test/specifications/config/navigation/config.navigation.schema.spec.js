require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/config/navigation/config.navigation.schema.json')
const dataObject = require('~/test/specifications/config/navigation/config.navigation.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/config/navigation/config.navigation.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
