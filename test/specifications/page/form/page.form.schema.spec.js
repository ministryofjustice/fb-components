require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/page/form/page.form.schema.json')
const dataObject = require('~/test/specifications/page/form/page.form.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/specifications/page/form/page.form.schema.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
