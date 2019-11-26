require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/page/error/error.401.json')

describe('~/metadata/page/error/error.401.json', () => it('exists', () => expect(dataObject).to.exist))
