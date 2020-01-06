require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/component/actions.json')

describe('~/fb-components/metadata/component/actions.json', () => it('exists', () => expect(dataObject).to.exist))
