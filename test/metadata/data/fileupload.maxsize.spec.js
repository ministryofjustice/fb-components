require('@ministryofjustice/module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/fb-components/metadata/data/fileupload.maxsize.json')

describe('~/fb-components/metadata/data/fileupload.maxsize.json', () => it('exists', () => expect(dataObject).to.exist))
