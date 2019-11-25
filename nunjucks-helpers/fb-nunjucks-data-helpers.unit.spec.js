const {
  test
} = require('tap')
const {
  init,
  setError,
  setLabel,
  setItemsLabel,
  setContent,
  setWidthClass,
  setInputWidthClass
} = require('./fb-nunjucks-data-helpers')

test('When fb-nunjucks-data-helpers is required', t => {
  t.ok(setError, 'it should export the setError method')
  t.ok(setLabel, 'it should export the setLabel method')
  t.ok(setItemsLabel, 'it should export the setItemsLabel method')
  t.ok(setContent, 'it should export the setContent method')
  t.ok(setWidthClass, 'it should export the setWidthClass method')
  t.ok(setInputWidthClass, 'it should export the setInputWidthClass method')

  t.end()
})

const testIdsChecked = {}
const testIdChecker = (t, fn, testDuplicate) => {
  if (testIdsChecked[fn]) {
    if (testDuplicate) {
      t.ok(true, 'it should catch duplicates')
    } else {
      t.notok(`${fn.name} already called`)
    }
  }
  testIdsChecked[fn] = true
}
test('When testIdChecker is called', t => {
  testIdChecker(t, testIdChecker)
  testIdChecker(t, testIdChecker, true)
  t.end()
})

const testIds = (t, fn) => {
  testIdChecker(t, fn)
  const idData = fn({
    _id: 'idValue'
  })
  t.equals(idData.id, 'idValue', 'it should set the id to the value of _id')

  const explicitIdData = fn({
    id: 'explicitIdValue',
    _id: 'idValue'
  })
  t.equals(explicitIdData.id, 'explicitIdValue', 'it should respect the value of id if explictly passed')
}

test('When setError is called', t => {
  const withError = setError({
    error: 'error string'
  })
  t.deepEquals(withError, {
    error: 'error string',
    errorMessage: {
      html: 'error string'
    }
  }, 'it should update the errorMessage property with the value of the error')

  const withoutError = setError({})
  t.deepEquals(withoutError, {}, 'it should not update the errorMessage property if no error was passed')

  t.end()
})

test('When setLabel is called', t => {
  testIds(t, setLabel)

  const labelData = setLabel({
    label: 'labelValue',
    _id: 'labelId'
  })
  t.equals(labelData.label.html, 'labelValue', 'it should set the label.html property with the value of any flat label passed')

  t.deepEquals(labelData.label.attributes, {
    'data-block-id': 'labelId',
    'data-block-property': 'label'
  }, 'it should set the expected data-block- properties on the attributes of any flat label passed')

  const nestedLabelData = setLabel({
    label: {
      html: 'nestedLabelValue',
      attributes: {
        foo: 'bar'
      }
    },
    _id: 'labelId'
  })
  t.deepEquals(nestedLabelData.label, {
    html: 'nestedLabelValue',
    attributes: {
      foo: 'bar',
      'data-block-id': 'labelId',
      'data-block-property': 'label'
    }
  }, 'it should let an explicitly passed label object property pass through adding only the expected data-block- properties')

  const labelItemsData = setItemsLabel(setLabel({
    label: 'labelItemsValue',
    _id: 'labelId'
  }))
  t.deepEquals(labelItemsData.label, {
    html: 'labelItemsValue',
    attributes: {
      'data-block-id': 'labelId',
      'data-block-property': 'label'
    }
  }, 'it should not overwrite the label atttributes when calling setItemsLabel')

  const hintData = setLabel({
    hint: 'hintValue'
  })
  t.equals(hintData.hint.html, 'hintValue', 'it should set the hint.html property with the value of any flat hint passed')

  const nestedHintData = setLabel({
    hint: {
      html: 'nestedHintValue'
    }
  })
  t.deepEquals(nestedHintData.hint, {
    html: 'nestedHintValue'
  }, 'it should let an explicitly passed hint object property pass through untouched')

  const undefinedData = setLabel({})
  t.equals(undefinedData.label, undefined, 'it should not set the label property if no label passed')
  t.equals(undefinedData.hint, undefined, 'it should not set the hint property if no hint passed')

  const labelDataClassUndefined = setLabel({
    label: 'labelValue'
  })
  t.equals(labelDataClassUndefined.label.classes, undefined, 'it should not set the default size class if none has been set')

  const nunjucksEnv = {
    addGlobal: () => {}
  }
  init(nunjucksEnv, {
    mappings: {
      label: {
        single: 'single-size-class',
        multiple: 'multiple-size-class'
      }
    }
  })

  const labelDataClassDefined = setLabel({
    label: 'labelValue'
  })
  t.equals(labelDataClassDefined.label.classes, 'multiple-size-class', 'it should set the default size class if one has been set')
  const labelDataIsPageHeading = setLabel({
    label: {
      html: 'labelValue',
      isPageHeading: true
    }
  })
  t.equals(labelDataIsPageHeading.label.classes, 'single-size-class', 'it should set the default size class for a single question page if one has been set')

  const labelDataHasClass = setLabel({
    label: {
      html: 'labelValue',
      classes: 'existing-class'
    }
  })
  t.equals(labelDataHasClass.label.classes, 'existing-class multiple-size-class', 'it should append default size class if classes property already exists')

  t.end()
})

test('When setItemsLabel is called', t => {
  testIds(t, setItemsLabel)

  const labelData = setItemsLabel({
    label: 'labelValue'
  })
  t.equals(labelData.label.html, 'labelValue', 'it should set the label.html property with the value of any flat label passed')
  t.equals(labelData.fieldset.legend.html, 'labelValue', 'it should set the fieldset.legend.html property with the value of any flat label passed')

  const hintData = setItemsLabel({
    hint: 'hintValue'
  })
  t.equals(hintData.hint.html, 'hintValue', 'it should set the label.html property with the value of any flat hint passed')
  t.equals(hintData.fieldset.hint.html, 'hintValue', 'it should set the fieldset.legend.html property with the value of any flat hint passed')

  const errorData = setItemsLabel({
    error: 'errorValue'
  })
  t.equals(errorData.fieldset.errorMessage.html, 'errorValue', 'it should set the fieldset.errorMessage.html property with the value of any error passed')

  const itemsData = setItemsLabel({
    name: 'name',
    items: [{
      text: 'item1text',
      id: 'item1id'
    }, {
      html: 'item2html',
      hint: 'hint2html'
    }, {
      label: 'item3label',
      name: 'foo.bar'
    }, {
      label: 'item4label',
      hasDivider: true
    }]
  })
  t.equals(itemsData.items[0].html, 'item1text', 'it should set the item.html property with the value of any text property passed')
  t.equals(itemsData.items[1].html, 'item2html', 'it should set the item.html property with the value of any html property passed')
  t.equals(itemsData.items[2].html, 'item3label', 'it should set the item.html property with the value of any html property passed')

  t.equals(itemsData.items[1].hint.html, 'hint2html', 'it should set the item.html property with the value of any html property passed')

  t.equals(itemsData.items[0].id, 'item1id', 'it should use the item.id property if passed explicitly')
  t.equals(itemsData.items[1].id, 'name-1', 'it should set the item.id property with the value of any name property passed on the parent data')
  t.equals(itemsData.items[2].id, 'foo--bar', 'it should set the item.id property with the value of its name property, substituting dots with double dashes')

  t.equals(itemsData.items[3].divider, 'or', 'it should insert a divider if requested')
  t.equals(itemsData.items[4].html, 'item4label', 'it should insert item correctly after divider')

  t.end()
})

test('When setContent is called', t => {
  const output = setContent({
    heading: '# Hello world\n\nGoodbye\n\n- One\n- Two\n- Three'
  }, 'heading')
  t.equals(output.heading, '<h1>Hello world</h1>\n<p>Goodbye</p>\n<ul>\n<li>One</li>\n<li>Two</li>\n<li>Three</li>\n</ul>', 'it should render the property as markdown')

  const impliedHtmlOutput = setContent({
    html: 'Implied'
  })
  t.equals(impliedHtmlOutput.html, '<p>Implied</p>', 'it should use the html property if no property passed explicitly')

  t.end()
})

const testWidthClass = (t, classMethod, className) => {
  const widthClassUndefined = classMethod({})
  t.equals(widthClassUndefined.classes, undefined, 'it should not set classes if no value or default')

  const widthClass10 = classMethod({
    [className]: '20'
  })
  t.equals(widthClass10.classes, 'govuk-input--width-20', 'it should set the character-based classes')

  const widthClassOneThird = classMethod({
    [className]: 'one-third'
  })
  t.equals(widthClassOneThird.classes, 'govuk-!-width-one-third', 'it should set the proprtion-based classes')

  const widthClassDefault = classMethod({}, 10)
  t.equals(widthClassDefault.classes, 'govuk-input--width-10', 'it should use the default if no property is set')

  const widthClassDefaultWithValue = classMethod({
    [className]: 'one-third'
  }, 10)
  t.equals(widthClassDefaultWithValue.classes, 'govuk-!-width-one-third', 'it should honour an explicitly passed value rather than the default')

  const widthClasses = classMethod({
    classes: 'class-value',
    [className]: '20'
  })
  t.equals(widthClasses.classes, 'class-value govuk-input--width-20', 'it should keep any previous set value of the classes property')

  t.end()
}

test('When setWidthClass is called', t => {
  testWidthClass(t, setWidthClass, 'widthClass')
})

test('When setInputWidthClass is called', t => {
  testWidthClass(t, setInputWidthClass, 'widthClassInput')
})
