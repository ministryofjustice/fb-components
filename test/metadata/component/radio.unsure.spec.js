require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/component/radio.unsure.json')

describe('~/metadata/component/radio.unsure.json', () => it('exists', () => expect(dataObject).to.exist))
