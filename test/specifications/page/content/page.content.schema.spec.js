require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/fb-components/test/schemas')

const jsonSchema = require('~/fb-components/specifications/page/content/page.content.schema.json')
const dataObject = require('~/fb-components/test/specifications/page/content/page.content.json')

const ajv = new Ajv({ schemas })

const validator = ajv.compile(jsonSchema)

describe('~/fb-components/specifications/page/content/page.content.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
