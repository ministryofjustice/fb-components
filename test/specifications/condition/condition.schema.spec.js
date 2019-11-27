require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObjectForAll = require('~/test/specifications/condition/condition.all.json')
const dataObjectForAny = require('~/test/specifications/condition/condition.any.json')
const dataObjectForBoolean = require('~/test/specifications/condition/condition.boolean.json')
const dataObjectForDefined = require('~/test/specifications/condition/condition.defined.json')
const dataObjectForNumber = require('~/test/specifications/condition/condition.number.json')
const dataObjectForText = require('~/test/specifications/condition/condition.text.json')

const jsonSchema = require('~/specifications/condition/condition.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/condition/condition.schema.json', () => {
  it('validates for `all`', () => expect(validator(dataObjectForAll)).to.be.true)

  it('validates for `any`', () => expect(validator(dataObjectForAny)).to.be.true)

  it('validates for `boolean`', () => expect(validator(dataObjectForBoolean)).to.be.true)

  it('validates for `defined`', () => expect(validator(dataObjectForDefined)).to.be.true)

  it('validates for `number`', () => expect(validator(dataObjectForNumber)).to.be.true)

  it('validates for `text`', () => expect(validator(dataObjectForText)).to.be.true)
})
