require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/metadata/data/fileupload.maxsize.json')

describe('~/metadata/data/fileupload.maxsize.json', () => it('exists', () => expect(dataObject).to.exist))
