require('module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObjectForOn = require('~/test/components-core/specifications/config/module/config.module.on.json')
const dataObjectForOff = require('~/test/components-core/specifications/config/module/config.module.off.json')

const jsonSchema = require('~/components-core/specifications/config/module/config.module.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/components-core/specifications/config/module/config.module.schema.json', () => {
  describe('The data object for `on`', () => it('has properties', () => expect(dataObjectForOn).not.to.be.empty))
  describe('The data object for `off`', () => it('has properties', () => expect(dataObjectForOff).not.to.be.empty))

  describe('The json schema', () => {
    it('validates the data object for `on`', () => expect(validator(dataObjectForOn)).to.be.true)

    it('validates the data object for `off`', () => expect(validator(dataObjectForOff)).to.be.true)
  })
})
