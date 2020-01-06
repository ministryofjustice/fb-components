require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/component/radio.yes.json')

describe('~/fb-components/metadata/component/radio.yes.json', () => it('exists', () => expect(dataObject).to.exist))
