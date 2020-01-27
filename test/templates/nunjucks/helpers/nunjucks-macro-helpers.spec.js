require('@ministryofjustice/module-alias/register')

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const {
  init,
  setObject,
  setObjectProperty
} = require('~/fb-components/templates/nunjucks/helpers/nunjucks-macro-helpers')

const {
  expect
} = chai

chai.use(sinonChai)

describe('~/fb-components/templates/nunjucks/helpers/nunjucks-macro-helpers', () => {
  describe('Always', () => {
    it('exports `init`', () => expect(init).to.be.a('function'))

    it('exports `setObject`', () => expect(setObject).to.be.a('function'))

    it('exports `setObjectProperty`', () => expect(setObjectProperty).to.be.a('function'))
  })

  describe('`init()`', () => {
    describe('A Nunjucks environment is passed', () => {
      let mockNunjucksEnvironment
      let addFilterStub
      let addGlobalStub
      let renderStringStub

      beforeEach(() => {
        addFilterStub = sinon.stub()
        addGlobalStub = sinon.stub()
        renderStringStub = sinon.stub()

        mockNunjucksEnvironment = {
          addFilter: addFilterStub,
          addGlobal: addGlobalStub,
          renderString: renderStringStub
        }
      })

      it('does not throw an error', () => expect(() => init(mockNunjucksEnvironment)).not.to.throw(Error)) // , 'No nunjucks environment passed'))

      it('calls `addFilter` with `json` and the `JSON.stringify` function', () => {
        init(mockNunjucksEnvironment)

        return expect(addFilterStub).to.be.calledWith('json', JSON.stringify)
      })

      it('calls `addGlobal` with `JSON` and the `JSON.stringify` function', () => {
        init(mockNunjucksEnvironment)

        return expect(addGlobalStub).to.be.calledWith('JSON', JSON.stringify)
      })

      it('calls `addGlobal` with `setObject` and the `setObject` function', () => {
        init(mockNunjucksEnvironment)

        return expect(addGlobalStub).to.be.calledWith('setObject', setObject)
      })

      it('calls `addGlobal` with `setObjectProperty` and the `setObjectProperty` function', () => {
        init(mockNunjucksEnvironment)

        return expect(addGlobalStub).to.be.calledWith('setObjectProperty', setObjectProperty)
      })

      it('calls `addGlobal` with `addGlobal` and a function', () => {
        init(mockNunjucksEnvironment)

        return expect(addGlobalStub).to.be.calledWith('addGlobal', sinon.match.typeOf('function'))
      })

      it('calls `addGlobal` with `$macros` and an object', () => {
        init(mockNunjucksEnvironment)

        return expect(addGlobalStub).to.be.calledWith('$macros', sinon.match.typeOf('object'))
      })

      it('calls `addGlobal` with `addMacro` and a function', () => {
        init(mockNunjucksEnvironment)

        return expect(addGlobalStub).to.be.calledWith('addMacro', sinon.match.typeOf('function'))
      })

      it('calls `addGlobal` with `addMacros` and a function', () => {
        init(mockNunjucksEnvironment)

        return expect(addGlobalStub).to.be.calledWith('addMacros', sinon.match.typeOf('function'))
      })

      it('assigns a function to the `addMacros` field on the Nunjucks environment', () => {
        const returnValue = init(mockNunjucksEnvironment)

        return expect(returnValue.addMacros).to.be.a('function')
      })

      it('calls `renderString` with a string', () => {
        init(mockNunjucksEnvironment)

        return expect(renderStringStub).to.be.calledWith(sinon.match.typeOf('string'))
      })

      it('returns the Nunjucks environment', () => expect(init(mockNunjucksEnvironment)).to.equal(mockNunjucksEnvironment))
    })

    describe('A Nunjucks environment is not passed', () => {
      it('throws an error', () => expect(init).to.throw(Error, 'No nunjucks environment passed'))
    })
  })

  describe('`setObject()`', () => {
    describe('One object is passed', () => it('returns an object', () => expect(setObject({ x: 1 })).to.eql({ x: 1 })))

    describe('Two or more objects are passed', () => it('merges the objects', () => expect(setObject({ foo: 'bar' }, { bar: 'foo' }, { x: 1 })).to.eql({ foo: 'bar', bar: 'foo', x: 1 })))

    describe('No objects are passed', () => it('returns an object', () => expect(setObject()).to.eql({})))
  })

  describe('`setObjectProperty()`', () => {
    describe('An object and a key and a value are passed', () => it('returns an object', () => expect(setObjectProperty({ x: 1 }, 'foo', 'bar')).to.eql({ x: 1, foo: 'bar' })))
  })
})
