require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const dataObjectForOn = require('~/fb-components/test/specifications/config/module/config.module.on.json')
const dataObjectForOff = require('~/fb-components/test/specifications/config/module/config.module.off.json')

const jsonSchema = require('~/fb-components/specifications/config/module/config.module.schema.json')

const ajv = new Ajv({ schemas })

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/specifications/config/module/config.module.schema.json', () => {
  it('validates for `on`', () => expect(validator(dataObjectForOn)).to.be.true)

  it('validates for `off`', () => expect(validator(dataObjectForOff)).to.be.true)
})
