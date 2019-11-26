require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/page/error/error.500.json')

describe('~/metadata/page/error/error.500.json', () => it('exists', () => expect(dataObject).to.exist))
