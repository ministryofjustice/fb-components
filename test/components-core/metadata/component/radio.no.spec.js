require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/component/radio.no.json')

describe('~/components-core/metadata/component/radio.no.json', () => it('exists', () => expect(dataObject).to.exist))
