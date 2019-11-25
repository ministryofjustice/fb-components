require('module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObjectForEnumValue = require('~/test/components-core/specifications/definition/condition/valuetype/definition.condition.valuetype.value.json')
const dataObjectForEnumInput = require('~/test/components-core/specifications/definition/condition/valuetype/definition.condition.valuetype.input.json')
const dataObjectForEnumFeature = require('~/test/components-core/specifications/definition/condition/valuetype/definition.condition.valuetype.feature.json')
const jsonSchema = require('~/components-core/specifications/definition/condition/valuetype/definition.condition.valuetype.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/components-core/specifications/definition/condition/valuetype/definition.condition.valuetype.schema.json', () => {
  describe('The data object for `value`', () => it('has properties', () => expect(dataObjectForEnumValue).not.to.be.empty))

  describe('The data object for `input`', () => it('has properties', () => expect(dataObjectForEnumInput).not.to.be.empty))

  describe('The data object for `feature`', () => it('has properties', () => expect(dataObjectForEnumFeature).not.to.be.empty))

  describe('The json schema', () => {
    it('validates the data object for `value`', () => expect(validator(dataObjectForEnumValue)).to.be.true)

    it('validates the data object for `input`', () => expect(validator(dataObjectForEnumInput)).to.be.true)

    it('validates the data object for `feature`', () => expect(validator(dataObjectForEnumFeature)).to.be.true)
  })
})
