require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/config/config.header.json')

describe('~/metadata/config/config.header.json', () => it('exists', () => expect(dataObject).to.exist))
