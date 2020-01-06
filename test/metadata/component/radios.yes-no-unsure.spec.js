require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/component/radios.yes-no-unsure.json')

describe('~/fb-components/metadata/component/radios.yes-no-unsure.json', () => it('exists', () => expect(dataObject).to.exist))
