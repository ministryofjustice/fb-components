const accessibleAutocomplete = require('accessible-autocomplete')

document.querySelectorAll('.fb-autocomplete')
  .forEach((element) => {
    const getBooleanValue = (prop) => !(element.getAttribute(`data-autocomplete-${prop}`) === 'false')

    const minLength = Number(element.getAttribute('data-autocomplete-minLength'))
    const autoselect = getBooleanValue('autoselect')
    const confirmOnBlur = getBooleanValue('confirmOnBlur')
    const displayMenu = element.getAttribute('data-autocomplete-displayMenu')
    const showAllValues = getBooleanValue('showAllValues')
    const showNoOptionsFound = getBooleanValue('showNoOptionsFound')

    accessibleAutocomplete.enhanceSelectElement({
      minLength,
      autoselect,
      confirmOnBlur,
      displayMenu,
      showAllValues,
      showNoOptionsFound,
      defaultValue: '',
      selectElement: element
    })
  })
