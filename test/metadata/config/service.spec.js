require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/config/service.json')

describe('~/metadata/config/service.json', () => it('exists', () => expect(dataObject).to.exist))
