require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/component/radios.yes-no.json')

describe('~/components-core/metadata/component/radios.yes-no.json', () => it('exists', () => expect(dataObject).to.exist))
