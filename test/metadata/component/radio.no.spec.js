require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/component/radio.no.json')

describe('~/metadata/component/radio.no.json', () => it('exists', () => expect(dataObject).to.exist))
