require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/definition/block/definition.block.schema.json')
const dataObject = require('~/test/specifications/definition/block/definition.block.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/definition/block/definition.block.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
