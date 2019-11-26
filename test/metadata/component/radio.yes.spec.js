require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/component/radio.yes.json')

describe('~/metadata/component/radio.yes.json', () => it('exists', () => expect(dataObject).to.exist))
