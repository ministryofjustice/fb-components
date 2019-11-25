require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/component/actions.json')

describe('~/components-core/metadata/component/actions.json', () => it('exists', () => expect(dataObject).to.exist))
