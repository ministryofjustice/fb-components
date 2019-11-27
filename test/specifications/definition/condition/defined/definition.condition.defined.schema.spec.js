require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/definition/condition/defined/definition.condition.defined.schema.json')
const dataObject = require('~/test/specifications/definition/condition/defined/definition.condition.defined.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/definition/condition/defined/definition.condition.defined.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
