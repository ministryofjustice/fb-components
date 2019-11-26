require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/component/radios.yes-no-unsure.json')

describe('~/metadata/component/radios.yes-no-unsure.json', () => it('exists', () => expect(dataObject).to.exist))
