require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/component/radio.yes.json')

describe('~/components-core/metadata/component/radio.yes.json', () => it('exists', () => expect(dataObject).to.exist))
