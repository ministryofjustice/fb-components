require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/definition/conditionalcomponent/definition.conditionalcomponent.schema.json')
const dataObject = require('~/test/specifications/definition/conditionalcomponent/definition.conditionalcomponent.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/definition/conditionalcomponent/definition.conditionalcomponent.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
