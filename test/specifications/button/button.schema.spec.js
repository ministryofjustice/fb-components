require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const jsonSchema = require('~/fb-components/specifications/button/button.schema.json')
const dataObject = require('~/fb-components/test/specifications/button/button.json')

const ajv = new Ajv({ schemas })

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/specifications/button/button.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
