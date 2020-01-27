require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const dataObjectForDefined = require('~/fb-components/test/specifications/definition/condition/expression/definition.condition.expression.defined.json')
const dataObjectForText = require('~/fb-components/test/specifications/definition/condition/expression/definition.condition.expression.text.json')
const dataObjectForNumber = require('~/fb-components/test/specifications/definition/condition/expression/definition.condition.expression.number.json')
const dataObjectForBoolean = require('~/fb-components/test/specifications/definition/condition/expression/definition.condition.expression.boolean.json')
const jsonSchema = require('~/fb-components/specifications/definition/condition/expression/definition.condition.expression.schema.json')

const ajv = new Ajv({ schemas })

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/specifications/definition/condition/expression/definition.condition.expression.schema.json', () => {
  it('validates for `defined`', () => expect(validator(dataObjectForDefined)).to.be.true)

  it('validates for `text`', () => expect(validator(dataObjectForText)).to.be.true)

  it('validates for `number`', () => expect(validator(dataObjectForNumber)).to.be.true)

  it('validates for `boolean`', () => expect(validator(dataObjectForBoolean)).to.be.true)
})
