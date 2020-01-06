require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/page/error/error.403.json')

describe('~/fb-components/metadata/page/error/error.403.json', () => it('exists', () => expect(dataObject).to.exist))
