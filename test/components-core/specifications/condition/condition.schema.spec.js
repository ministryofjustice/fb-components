require('module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObjectForAll = require('~/test/components-core/specifications/condition/condition.all.json')
const dataObjectForAny = require('~/test/components-core/specifications/condition/condition.any.json')
const dataObjectForBoolean = require('~/test/components-core/specifications/condition/condition.boolean.json')
const dataObjectForDefined = require('~/test/components-core/specifications/condition/condition.defined.json')
const dataObjectForNumber = require('~/test/components-core/specifications/condition/condition.number.json')
const dataObjectForText = require('~/test/components-core/specifications/condition/condition.text.json')

const jsonSchema = require('~/components-core/specifications/condition/condition.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/components-core/specifications/condition/condition.schema.json', () => {
  describe('The data object', () => {
    it('has properties for `all`', () => expect(dataObjectForAll).not.to.be.empty)

    it('has properties for `any`', () => expect(dataObjectForAny).not.to.be.empty)

    it('has properties for `boolean`', () => expect(dataObjectForBoolean).not.to.be.empty)

    it('has properties for `defined`', () => expect(dataObjectForDefined).not.to.be.empty)

    it('has properties for `number`', () => expect(dataObjectForNumber).not.to.be.empty)

    it('has properties for `text`', () => expect(dataObjectForText).not.to.be.empty)
  })

  describe('The json schema', () => {
    it('validates the data object for `all`', () => expect(validator(dataObjectForAll)).to.be.true)

    it('validates the data object for `any`', () => expect(validator(dataObjectForAny)).to.be.true)

    it('validates the data object for `boolean`', () => expect(validator(dataObjectForBoolean)).to.be.true)

    it('validates the data object for `defined`', () => expect(validator(dataObjectForDefined)).to.be.true)

    it('validates the data object for `number`', () => expect(validator(dataObjectForNumber)).to.be.true)

    it('validates the data object for `text`', () => expect(validator(dataObjectForText)).to.be.true)
  })
})
