require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/page/error/error.401.json')

describe('~/components-core/metadata/page/error/error.401.json', () => it('exists', () => expect(dataObject).to.exist))
