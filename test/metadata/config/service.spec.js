require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/config/service.json')

describe('~/fb-components/metadata/config/service.json', () => it('exists', () => expect(dataObject).to.exist))
