require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const jsonSchema = require('~/fb-components/specifications/buttonPrimary/buttonPrimary.schema.json')
const dataObject = require('~/fb-components/test/specifications/buttonPrimary/buttonPrimary.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/specifications/buttonPrimary/buttonPrimary.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
