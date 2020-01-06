require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/component/radio.no.json')

describe('~/fb-components/metadata/component/radio.no.json', () => it('exists', () => expect(dataObject).to.exist))
