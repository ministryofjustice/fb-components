require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const jsonSchema = require('~/fb-components/specifications/string/string.schema.json')
const dataObject = require('~/fb-components/metadata/string/hint.date.select.json')

const ajv = new Ajv({ schemas })

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/metadata/string/hint.date.select.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
