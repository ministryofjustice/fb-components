require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/config/config.header.json')

describe('~/fb-components/metadata/config/config.header.json', () => it('exists', () => expect(dataObject).to.exist))
