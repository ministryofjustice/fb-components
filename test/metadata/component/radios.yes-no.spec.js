require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/component/radios.yes-no.json')

describe('~/metadata/component/radios.yes-no.json', () => it('exists', () => expect(dataObject).to.exist))
