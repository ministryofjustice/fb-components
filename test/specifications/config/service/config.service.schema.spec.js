require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const dataObjectForAlpha = require('~/test/specifications/config/service/config.service.alpha.json')
const dataObjectForBeta = require('~/test/specifications/config/service/config.service.beta.json')
const dataObjectForNone = require('~/test/specifications/config/service/config.service.none.json')

const jsonSchema = require('~/specifications/config/service/config.service.schema.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/config/service/config.service.schema.json', () => {
  it('validates for `alpha`', () => expect(validator(dataObjectForAlpha)).to.be.true)

  it('validates for `beta`', () => expect(validator(dataObjectForBeta)).to.be.true)

  it('validates for `none`', () => expect(validator(dataObjectForNone)).to.be.true)
})
