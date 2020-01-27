require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const dataObjectForEnumValue = require('~/fb-components/test/specifications/definition/condition/valuetype/definition.condition.valuetype.value.json')
const dataObjectForEnumInput = require('~/fb-components/test/specifications/definition/condition/valuetype/definition.condition.valuetype.input.json')
const dataObjectForEnumFeature = require('~/fb-components/test/specifications/definition/condition/valuetype/definition.condition.valuetype.feature.json')
const jsonSchema = require('~/fb-components/specifications/definition/condition/valuetype/definition.condition.valuetype.schema.json')

const ajv = new Ajv({ schemas })

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/specifications/definition/condition/valuetype/definition.condition.valuetype.schema.json', () => {
  it('validates for `value`', () => expect(validator(dataObjectForEnumValue)).to.be.true)

  it('validates for `input`', () => expect(validator(dataObjectForEnumInput)).to.be.true)

  it('validates for `feature`', () => expect(validator(dataObjectForEnumFeature)).to.be.true)
})
