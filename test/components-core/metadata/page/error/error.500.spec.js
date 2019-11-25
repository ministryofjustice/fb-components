require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/page/error/error.500.json')

describe('~/components-core/metadata/page/error/error.500.json', () => it('exists', () => expect(dataObject).to.exist))
