require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/config/service.json')

describe('~/components-core/metadata/config/service.json', () => it('exists', () => expect(dataObject).to.exist))
