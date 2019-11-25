require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/component/radios.yes-no-unsure.json')

describe('~/components-core/metadata/component/radios.yes-no-unsure.json', () => it('exists', () => expect(dataObject).to.exist))
