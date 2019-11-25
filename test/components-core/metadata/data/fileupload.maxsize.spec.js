require('module-alias/register')

const {
  expect
} = require('chai')

const dataObject = require('~/components-core/metadata/data/fileupload.maxsize.json')

describe('~/components-core/metadata/data/fileupload.maxsize.json', () => it('exists', () => expect(dataObject).to.exist))
