require('@ministryofjustice/module-alias/register')

const proxyquire = require('proxyquire')

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const nunjucksMacroHelpersInitStub = sinon.stub()
const nunjucksDataHelpersInitStub = sinon.stub()

const {
  init,
  setError,
  setLabel,
  setItemsLabel,
  setContent,
  setWidthClass,
  setInputWidthClass,
  setMainEditableInstanceProperty,
  setObject,
  setObjectProperty
} = proxyquire('~/fb-components/templates/nunjucks/helpers/nunjucks-helpers', {
  './nunjucks-macro-helpers': {
    init: nunjucksMacroHelpersInitStub,
    setObject: sinon.stub(),
    setObjectProperty: sinon.stub()
  },
  './nunjucks-data-helpers': {
    init: nunjucksDataHelpersInitStub,
    setError: sinon.stub(),
    setLabel: sinon.stub(),
    setItemsLabel: sinon.stub(),
    setContent: sinon.stub(),
    setWidthClass: sinon.stub(),
    setInputWidthClass: sinon.stub(),
    setMainEditableInstanceProperty: sinon.stub()
  }
})

const {
  expect
} = chai

chai.use(sinonChai)

describe('~/fb-components/templates/nunjucks/helpers/nunjucks-helpers', () => {
  describe('Always', () => {
    it('exports `init`', () => expect(init).to.be.a('function'))

    it('exports `setError`', () => expect(setError).to.be.a('function'))

    it('exports `setLabel`', () => expect(setLabel).to.be.a('function'))

    it('exports `setItemsLabel`', () => expect(setItemsLabel).to.be.a('function'))

    it('exports `setContent`', () => expect(setContent).to.be.a('function'))

    it('exports `setWidthClass`', () => expect(setWidthClass).to.be.a('function'))

    it('exports `setInputWidthClass`', () => expect(setInputWidthClass).to.be.a('function'))

    it('exports `setMainEditableInstanceProperty`', () => expect(setMainEditableInstanceProperty).to.be.a('function'))

    it('exports `setObject`', () => expect(setObject).to.be.a('function'))

    it('exports `setObjectProperty`', () => expect(setObjectProperty).to.be.a('function'))
  })

  describe('`init()`', () => {
    let mockNunjucksEnvironment
    let addFilterStub
    let addGlobalStub
    let renderStringStub
    let mockOptions

    beforeEach(() => {
      addFilterStub = sinon.stub()
      addGlobalStub = sinon.stub()
      renderStringStub = sinon.stub()

      mockNunjucksEnvironment = {
        addFilter: addFilterStub,
        addGlobal: addGlobalStub,
        renderString: renderStringStub
      }

      addFilterStub.returns(mockNunjucksEnvironment)
      addGlobalStub.returns(mockNunjucksEnvironment)
      renderStringStub.returns(mockNunjucksEnvironment)

      mockOptions = {}

      nunjucksMacroHelpersInitStub.returns(mockNunjucksEnvironment)
      nunjucksDataHelpersInitStub.returns(mockNunjucksEnvironment)

      init(mockNunjucksEnvironment, mockOptions)
    })

    it('calls `nunjucksMacroHelpers.init()`', () => expect(nunjucksMacroHelpersInitStub).to.be.calledWith(mockNunjucksEnvironment))

    it('calls `addFilter` with `addBlockInfo` and a function', () => expect(addFilterStub).to.be.calledWith('addBlockInfo', sinon.match.typeOf('function')))

    it('calls `renderString` with a string', () => expect(renderStringStub).to.be.calledWith(sinon.match.typeOf('string')))

    it('calls `nunjucksDataHelpers.init()`', () => expect(nunjucksDataHelpersInitStub).to.be.calledWith(mockNunjucksEnvironment, mockOptions))

    it('returns the Nunjucks environment', () => expect(init(mockNunjucksEnvironment)).to.equal(mockNunjucksEnvironment))
  })
})
