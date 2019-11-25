require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/config/config.header.json')

describe('~/components-core/metadata/config/config.header.json', () => it('exists', () => expect(dataObject).to.exist))
