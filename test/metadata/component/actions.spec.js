require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/component/actions.json')

describe('~/metadata/component/actions.json', () => it('exists', () => expect(dataObject).to.exist))
