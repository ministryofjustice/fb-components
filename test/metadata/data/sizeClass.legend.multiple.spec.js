require('@ministryofjustice/module-alias/register')

const Ajv = require('ajv')

const {
  expect
} = require('chai')

const schemas = require('~/test/schemas')

const jsonSchema = require('~/specifications/classname/classname.schema.json')
const dataObject = require('~/metadata/data/sizeClass.legend.multiple.json')

const ajv = new Ajv({schemas})

const validator = ajv.compile(jsonSchema)

describe('~/metadata/data/sizeClass.legend.multiple.json', () => it('validates', () => expect(validator(dataObject)).to.be.true))
