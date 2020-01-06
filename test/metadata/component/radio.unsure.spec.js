require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/component/radio.unsure.json')

describe('~/fb-components/metadata/component/radio.unsure.json', () => it('exists', () => expect(dataObject).to.exist))
