require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/config/modules/config.modules.schema.json')
const dataObject = require('~/test/specifications/config/modules/config.modules.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/config/modules/config.modules.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
