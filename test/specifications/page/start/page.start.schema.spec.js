require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/page/start/page.start.schema.json')
const dataObject = require('~/test/specifications/page/start/page.start.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/page/start/page.start.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
