require('module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObjectForDefined = require('~/test/specifications/definition/condition/expression/definition.condition.expression.defined.json')
const dataObjectForText = require('~/test/specifications/definition/condition/expression/definition.condition.expression.text.json')
const dataObjectForNumber = require('~/test/specifications/definition/condition/expression/definition.condition.expression.number.json')
const dataObjectForBoolean = require('~/test/specifications/definition/condition/expression/definition.condition.expression.boolean.json')
const jsonSchema = require('~/specifications/definition/condition/expression/definition.condition.expression.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/definition/condition/expression/definition.condition.expression.schema.json', () => {
  describe('The data object for `defined`', () => it('has properties', () => expect(dataObjectForDefined).not.to.be.empty))

  describe('The data object for `text`', () => it('has properties', () => expect(dataObjectForText).not.to.be.empty))

  describe('The data object for `number`', () => it('has properties', () => expect(dataObjectForNumber).not.to.be.empty))

  describe('The data object for `boolean`', () => it('has properties', () => expect(dataObjectForBoolean).not.to.be.empty))

  describe('The json schema', () => {
    it('validates the data object for `defined`', () => expect(validator(dataObjectForDefined)).to.be.true)

    it('validates the data object for `text`', () => expect(validator(dataObjectForText)).to.be.true)

    it('validates the data object for `number`', () => expect(validator(dataObjectForNumber)).to.be.true)

    it('validates the data object for `boolean`', () => expect(validator(dataObjectForBoolean)).to.be.true)
  })
})
