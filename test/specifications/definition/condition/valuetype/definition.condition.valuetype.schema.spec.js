require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObjectForEnumValue = require('~/test/specifications/definition/condition/valuetype/definition.condition.valuetype.value.json')
const dataObjectForEnumInput = require('~/test/specifications/definition/condition/valuetype/definition.condition.valuetype.input.json')
const dataObjectForEnumFeature = require('~/test/specifications/definition/condition/valuetype/definition.condition.valuetype.feature.json')
const jsonSchema = require('~/specifications/definition/condition/valuetype/definition.condition.valuetype.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/definition/condition/valuetype/definition.condition.valuetype.schema.json', () => {
  it('validates for `value`', () => expect(validator(dataObjectForEnumValue)).to.be.true)

  it('validates for `input`', () => expect(validator(dataObjectForEnumInput)).to.be.true)

  it('validates for `feature`', () => expect(validator(dataObjectForEnumFeature)).to.be.true)
})
