require('@ministryofjustice/module-alias/register')

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const {
  init,
  setError,
  setLabel,
  setItemsLabel,
  setContent,
  setWidthClass,
  setInputWidthClass,
  setMainEditableInstanceProperty
} = require('~/templates/nunjucks/helpers/nunjucks-data-helpers')

const {
  expect
} = chai

chai.use(sinonChai)

describe('~/templates/nunjucks/helpers/nunjucks-data-helpers', () => {
  describe('Always', () => {
    it('exports `init`', () => expect(init).to.be.a('function'))

    it('exports `setError`', () => expect(setError).to.be.a('function'))

    it('exports `setLabel`', () => expect(setLabel).to.be.a('function'))

    it('exports `setItemsLabel`', () => expect(setItemsLabel).to.be.a('function'))

    it('exports `setContent`', () => expect(setContent).to.be.a('function'))

    it('exports `setWidthClass`', () => expect(setWidthClass).to.be.a('function'))

    it('exports `setInputWidthClass`', () => expect(setInputWidthClass).to.be.a('function'))

    it('exports `setMainEditableInstanceProperty`', () => expect(setMainEditableInstanceProperty).to.be.a('function'))
  })

  describe('`init`', () => {
    describe('Always', () => {
      let forEachStub
      let entriesStub

      beforeEach(() => {
        forEachStub = sinon.stub()

        entriesStub = sinon.stub(global.Object, 'entries').returns({forEach: forEachStub})

        init()
      })

      afterEach(() => {
        entriesStub.restore()
      })

      it('calls `Object.entries()', () => expect(entriesStub).to.be.called)

      it('iterates over the entries', () => expect(forEachStub).to.be.called)
    })

    describe('Adding globals to the Nunjucks environment', () => {
      let addGlobalStub

      beforeEach(() => {
        addGlobalStub = sinon.stub()

        const mockNunjucksEnvironment = {
          addGlobal: addGlobalStub
        }

        init(mockNunjucksEnvironment)
      })

      it('Adds `setError` to the Nunjucks environment', () => expect(addGlobalStub).to.be.calledWith('setError', setError))

      it('Adds `setLabel` to the Nunjucks environment', () => expect(addGlobalStub).to.be.calledWith('setLabel', setLabel))

      it('Adds `setItemsLabel` to the Nunjucks environment', () => expect(addGlobalStub).to.be.calledWith('setItemsLabel', setItemsLabel))

      it('Adds `setContent` to the Nunjucks environment', () => expect(addGlobalStub).to.be.calledWith('setContent', setContent))

      it('Adds `setWidthClass` to the Nunjucks environment', () => expect(addGlobalStub).to.be.calledWith('setWidthClass', setWidthClass))

      it('Adds `setInputWidthClass` to the Nunjucks environment', () => expect(addGlobalStub).to.be.calledWith('setInputWidthClass', setInputWidthClass))

      it('Adds `setMainEditableInstanceProperty` to the Nunjucks environment', () => expect(addGlobalStub).to.be.calledWith('setMainEditableInstanceProperty', setMainEditableInstanceProperty))
    })
  })

  describe('`setError()`', () => {
    describe('An error is passed as an argument', () => {
      it('returns an object with the error message assigned to the field `errorMessage`', () => {
        const returnValue = setError({error: 'error string'})

        expect(returnValue).to.eql({
          error: 'error string',
          errorMessage: {
            html: 'error string'
          }
        })
      })
    })

    describe('An error is not passed as an argument', () => {
      it('returns an object', () => {
        const returnValue = setError({})

        expect(returnValue).to.eql({})
      })
    })
  })

  describe('`setLabel()`', () => {
    describe('Always', () => {
      describe('A label is passed as an argument', () => {
        let returnValue

        beforeEach(() => {
          returnValue = setLabel({
            label: 'mock label value',
            hint: 'mock hint value',
            _id: 'mock label id'
          })
        })

        it('returns an object with the `label` value assigned to the field `label.html`', () => expect(returnValue.label.html).to.equal('mock label value'))

        it('returns an object with the `hint` value assigned to the field `hint.html`', () => expect(returnValue.hint.html).to.equal('mock hint value'))

        it('returns an object with attributes assigned to the field `label.attributes`', () => {
          expect(returnValue.label.attributes).to.eql({
            'data-block-id': 'mock label id',
            'data-block-property': 'label'
          })
        })

        describe('A nested label is passed as an argument', () => {
          let returnValue

          beforeEach(() => {
            returnValue = setLabel({
              label: {
                html: 'mock nested label value',
                attributes: {
                  foo: 'bar'
                }
              },
              hint: {
                html: 'mock nested hint value'
              },
              _id: 'mock nested label id'
            })
          })

          it('returns an object with the nested `label` value assigned to the field `label.html`', () => expect(returnValue.label.html).to.equal('mock nested label value'))

          it('returns an object with the nested `hint` value assigned to the field `hint.html`', () => expect(returnValue.hint.html).to.equal('mock nested hint value'))

          it('returns an object with additional attributes assigned to the field `label.attributes`', () => {
            expect(returnValue.label.attributes).to.eql({
              foo: 'bar',
              'data-block-id': 'mock nested label id',
              'data-block-property': 'label'
            })
          })
        })
      })

      describe('A label is not passed as an argument', () => {
        let returnValue

        beforeEach(() => {
          returnValue = setLabel({})
        })

        it('returns an object without a `label` field', () => expect(returnValue.label).to.be.undefined)

        it('returns an object without a `hint` field', () => expect(returnValue.hint).to.be.undefined)
      })
    })

    describe('`mappings` are defined', () => {
      beforeEach(() => {
        const mockNunjucksEnvironment = {addGlobal: sinon.stub()}

        init(mockNunjucksEnvironment, {
          mappings: {
            label: {
              single: 'single-size-class',
              multiple: 'multiple-size-class'
            }
          }
        })
      })

      describe('A multiple question page', () => {
        it('returns an object with default multiple question classes assigned to the field `label.classes`', () => {
          const returnValue = setLabel({
            label: 'mock label value',
            isPageHeading: false
          })

          return expect(returnValue.label.classes).to.equal('multiple-size-class')
        })
      })

      describe('A single question page', () => {
        it('returns an object with default single question classes appended to the field `label.classes`', () => {
          const returnValue = setLabel({
            label: {
              html: 'mock label value',
              isPageHeading: true
            }
          })

          return expect(returnValue.label.classes).to.equal('single-size-class')
        })
      })

      describe('A label has a `classes` field', () => {
        it('returns an object with default classes appended to the field `label.classes`', () => {
          const returnValue = setLabel({
            label: {
              html: 'mock label value',
              classes: 'mock-classes'
            }
          })

          return expect(returnValue.label.classes).to.equal('mock-classes multiple-size-class')
        })
      })

      describe('A label does not have a `classes` field', () => {
        it('returns an object with default classes assigned to the field `label.classes`', () => {
          const returnValue = setLabel({label: 'mock label value'})

          return expect(returnValue.label.classes).to.equal('multiple-size-class')
        })
      })
    })

    describe('`mappings` are not defined', () => {
      let returnValue

      beforeEach(() => {
        const mockNunjucksEnvironment = {addGlobal: sinon.stub()}

        init(mockNunjucksEnvironment, {mappings: {}})

        returnValue = setLabel({
          label: 'mock label value',
          hint: 'mock hint value',
          _id: 'mock label id'
        })
      })

      it('returns an object without classes assigned to the field `label.classes`', () => expect(returnValue.label.classes).to.be.undefined)
    })
  })

  describe('`setItemsLabel()`', () => {
    describe('An error is passed as an argument', () => {
      it('returns an object with the error message assigned to the field `fieldset.errorMessage.html`', () => {
        const mockError = {
          error: 'mock error message',
          errorMessage: {
            html: 'mock error message'
          }
        }

        const returnValue = setItemsLabel(mockError)

        return expect(returnValue.fieldset.errorMessage.html).to.equal('mock error message')
      })
    })

    describe('A label is passed as an argument', () => {
      let returnValue

      beforeEach(() => {
        const mockLabel = {
          label: {
            classes: 'mock-classes',
            html: 'mock label value',
            attributes: {
              'data-block-id': 'mock label id',
              'data-block-property': 'label'
            }
          },
          hint: {
            html: 'mock hint value',
            attributes: {
              'data-block-id': 'mock label id',
              'data-block-property': 'hint'
            }
          },
          _id: 'mock label id',
          id: 'mock label id'
        }

        returnValue = setItemsLabel(mockLabel)
      })

      it('returns an object with the `label` value assigned to the field `label.html`', () => expect(returnValue.label.html).to.equal('mock label value'))

      it('returns an object with the `hint` value assigned to the field `hint.html`', () => expect(returnValue.hint.html).to.equal('mock hint value'))

      it('returns an object with attributes assigned to the field `label.attributes`', () => {
        expect(returnValue.label.attributes).eql({
          'data-block-id': 'mock label id',
          'data-block-property': 'label'
        })
      })

      it('returns an object with the `label` value assigned to the field `fieldset.legend.html`', () => expect(returnValue.fieldset.legend.html).to.equal('mock label value'))

      it('returns an object with the `hint` value assigned to the field `fieldset.hint.html`', () => expect(returnValue.fieldset.hint.html).to.equal('mock hint value'))
    })

    describe('Labels are passed as an argument', () => {
      let returnValue

      beforeEach(() => {
        const mockLabels = {
          name: 'mock name',
          items: [
            {
              text: 'mock item 1 text',
              id: 'mock item 1 id'
            },
            {
              html: 'mock item 2 html',
              hint: 'mock item 2 hint'
            },
            {
              label: 'mock item 3 label',
              name: 'mock.item.3.name'
            },
            {
              label: 'mock item 4 label',
              hasDivider: true
            }
          ]
        }

        returnValue = setItemsLabel(mockLabels)
      })

      it('returns an object with an `items` field', () => expect(returnValue.items).to.be.an('array'))

      describe('The first item in the `items` collection', () => {
        it('has the `text` value assigned to the field `html`', () => {
          const {
            items: [
              first
            ]
          } = returnValue

          return expect(first.html).to.equal('mock item 1 text')
        })

        it('does not have a field `hint`', () => {
          const {
            items: [
              first
            ]
          } = returnValue

          return expect(first.hint).to.be.undefined
        })

        it('has the `id` value assigned to the field `id`', () => {
          const {
            items: [
              first
            ]
          } = returnValue

          return expect(first.id).to.equal('mock item 1 id')
        })

        it('does not have an `hasDivider` field', () => {
          const {
            items: [
              first
            ]
          } = returnValue

          return expect(first.hasDivider).to.be.undefined
        })
      })

      describe('The second item in the `items` collection', () => {
        it('has the `html` value assigned to the field `html`', () => {
          const {
            items: [
              , second
            ]
          } = returnValue

          return expect(second.html).to.equal('mock item 2 html')
        })

        it('has the `hint` value assigned to the field `hint.html`', () => {
          const {
            items: [
              , second
            ]
          } = returnValue

          return expect(second.hint.html).to.equal('mock item 2 hint')
        })

        it('has an `id` value assigned to the field `id`', () => {
          const {
            items: [
              , second
            ]
          } = returnValue

          return expect(second.id).to.equal('mock name-1')
        })

        it('does not have an `hasDivider` field', () => {
          const {
            items: [
              , second
            ]
          } = returnValue

          return expect(second.hasDivider).to.be.undefined
        })
      })

      describe('The third item in the `items` collection', () => {
        it('has the html value assigned to the field `html`', () => {
          const {
            items: [
              , , third
            ]
          } = returnValue

          return expect(third.html).to.equal('mock item 3 label')
        })

        it('does not have a field `hint`', () => {
          const {
            items: [
              , , third
            ]
          } = returnValue

          return expect(third.hint).to.be.undefined
        })

        it('has an `id` value assigned to the field `id` (with dots replaced by double dashes)', () => {
          const {
            items: [
              , , third
            ]
          } = returnValue

          return expect(third.id).to.equal('mock--item--3--name')
        })

        it('does not have an `hasDivider` field', () => {
          const {
            items: [
              , , third
            ]
          } = returnValue

          return expect(third.hasDivider).to.be.undefined
        })
      })

      describe('The fourth item in the `items` collection', () => {
        it('is a divider', () => {
          const {
            items: [
              , , , fourth
            ]
          } = returnValue

          return expect(fourth.divider).to.equal('or')
        })
      })

      describe('The fifth item in the `items` collection', () => {
        it('has the html value assigned to the field `html`', () => {
          const {
            items: [
              , , , , fifth
            ]
          } = returnValue

          return expect(fifth.html).to.equal('mock item 4 label')
        })

        it('does not have a field `hint`', () => {
          const {
            items: [
              , , , , fifth
            ]
          } = returnValue

          return expect(fifth.hint).to.be.undefined
        })

        it('has an `id` value assigned to the field `id`', () => {
          const {
            items: [
              , , , , fifth
            ]
          } = returnValue

          return expect(fifth.id).to.equal('mock name-3')
        })

        it('has an `hasDivider` field', () => {
          const {
            items: [
              , , , , fifth
            ]
          } = returnValue

          return expect(fifth.hasDivider).to.be.true
        })
      })
    })
  })

  describe('`setContent()`', () => {
    describe('The content contains markdown', () => {
      it('transforms the content to HTML', () => {
        const returnValue = setContent({heading: '# Hello world\n\nGoodbye\n\n- One\n- Two\n- Three'}, 'heading')

        return expect(returnValue.heading).to.equal('<h1>Hello world</h1>\n<p>Goodbye</p>\n<ul>\n<li>One</li>\n<li>Two</li>\n<li>Three</li>\n</ul>')
      })
    })

    describe('The content does not contain markdown', () => {
      it('transforms the content to HTML', () => {
        const returnValue = setContent({heading: 'Hello world\n\nGoodbye\n\n- One\n- Two\n- Three'}, 'heading')

        return expect(returnValue.heading).to.equal('<p>Hello world</p>\n<p>Goodbye</p>\n<ul>\n<li>One</li>\n<li>Two</li>\n<li>Three</li>\n</ul>')
      })
    })

    describe('The content is text on the `html` field', () => {
      it('transforms the content to HTML', () => {
        const returnValue = setContent({html: 'mock text content'})

        return expect(returnValue.html).to.equal('<p>mock text content</p>')
      })
    })
  })

  /**
   *  Behaviour as `setInputWidthClass`
   */
  describe('`setWidthClass()`', () => {
    describe('A character-based value is provided', () => {
      it('returns an object with the character-based value on the `classes` field', () => {
        const returnValue = setWidthClass({widthClass: '20'})

        return expect(returnValue.classes).to.equal('govuk-input--width-20')
      })
    })

    describe('A proportion-based value is provided', () => {
      it('returns an object with the proportion-based value on the `classes` field', () => {
        const returnValue = setWidthClass({widthClass: 'one-third'})

        return expect(returnValue.classes).to.equal('govuk-!-width-one-third')
      })
    })

    describe('A proportion-based value and a default value are provided', () => {
      it('returns an object with the proportion-based value on the `classes` field', () => {
        const returnValue = setWidthClass({widthClass: 'one-third'}, 10)

        return expect(returnValue.classes).to.equal('govuk-!-width-one-third')
      })
    })

    describe('A proportion-based value and a default value are provided', () => {
      it('returns an object with the proportion-based value on the `classes` field', () => {
        const returnValue = setWidthClass({widthClass: 'one-third'}, 10)

        return expect(returnValue.classes).to.equal('govuk-!-width-one-third')
      })
    })

    describe('A `classes` field is provided', () => {
      it('returns an object with `classes` field', () => {

      })

      describe('And a character-based value is provided', () => {
        it('returns an object with the character-based value appended to the `classes` field', () => {
          const returnValue = setWidthClass({classes: 'mock-classes', widthClass: '20'})

          return expect(returnValue.classes).to.equal('mock-classes govuk-input--width-20')
        })
      })

      describe('And a proportion-based value is provided', () => {
        it('returns an object with the proportion-based value appended to the `classes` field', () => {
          const returnValue = setWidthClass({classes: 'mock-classes', widthClass: 'one-third'})

          return expect(returnValue.classes).to.equal('mock-classes govuk-!-width-one-third')
        })
      })
    })

    describe('Without a class name field', () => {
      describe('A default value is passed', () => {
        it('returns an object with the default value on the `classes` field', () => {
          const returnValue = setWidthClass({}, 10)

          return expect(returnValue.classes).to.equal('govuk-input--width-10')
        })
      })

      describe('A default value is not passed', () => {
        it('returns an object without a `classes` field', () => {
          const returnValue = setWidthClass({})

          return expect(returnValue.classes).to.be.undefined
        })
      })
    })
  })

  /**
   *  Behaviour as `setWidthClass`
   */
  describe('`setInputWidthClass()`', () => {
    describe('A character-based value is provided', () => {
      it('returns an object with the character-based value on the `classes` field', () => {
        const returnValue = setInputWidthClass({widthClassInput: '20'})

        return expect(returnValue.classes).to.equal('govuk-input--width-20')
      })
    })

    describe('A proportion-based value is provided', () => {
      it('returns an object with the proportion-based value on the `classes` field', () => {
        const returnValue = setInputWidthClass({widthClassInput: 'one-third'})

        return expect(returnValue.classes).to.equal('govuk-!-width-one-third')
      })
    })

    describe('A proportion-based value and a default value are provided', () => {
      it('returns an object with the proportion-based value on the `classes` field', () => {
        const returnValue = setInputWidthClass({widthClassInput: 'one-third'}, 10)

        return expect(returnValue.classes).to.equal('govuk-!-width-one-third')
      })
    })

    describe('A proportion-based value and a default value are provided', () => {
      it('returns an object with the proportion-based value on the `classes` field', () => {
        const returnValue = setInputWidthClass({widthClassInput: 'one-third'}, 10)

        return expect(returnValue.classes).to.equal('govuk-!-width-one-third')
      })
    })

    describe('A `classes` field is provided', () => {
      it('returns an object with `classes` field', () => {

      })

      describe('And a character-based value is provided', () => {
        it('returns an object with the character-based value appended to the `classes` field', () => {
          const returnValue = setInputWidthClass({classes: 'mock-classes', widthClassInput: '20'})

          return expect(returnValue.classes).to.equal('mock-classes govuk-input--width-20')
        })
      })

      describe('And a proportion-based value is provided', () => {
        it('returns an object with the proportion-based value appended to the `classes` field', () => {
          const returnValue = setInputWidthClass({classes: 'mock-classes', widthClassInput: 'one-third'})

          return expect(returnValue.classes).to.equal('mock-classes govuk-!-width-one-third')
        })
      })
    })

    describe('Without a class name field', () => {
      describe('A default value is passed', () => {
        it('returns an object with the default value on the `classes` field', () => {
          const returnValue = setInputWidthClass({}, 10)

          return expect(returnValue.classes).to.equal('govuk-input--width-10')
        })
      })

      describe('A default value is not passed', () => {
        it('returns an object without a `classes` field', () => {
          const returnValue = setInputWidthClass({})

          return expect(returnValue.classes).to.be.undefined
        })
      })
    })
  })
})
