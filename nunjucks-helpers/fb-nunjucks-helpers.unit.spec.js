const {
  test
} = require('tap')
const fbNunjucksHelpers = require('./fb-nunjucks-helpers')
const {initEnv, defaultViewPaths} = require('./spec/load-nunjucks')
const getEnv = initEnv(fbNunjucksHelpers)

test('When fb-nunjucks-data-helpers is loaded', t => {
  t.ok(fbNunjucksHelpers.init, 'it should export the init method')
  t.ok(fbNunjucksHelpers.setObject, 'it should export the setObject method')
  t.ok(fbNunjucksHelpers.setObjectProperty, 'it should export the setObjectProperty method')
  t.ok(fbNunjucksHelpers.setError, 'it should export the setError method')
  t.ok(fbNunjucksHelpers.setLabel, 'it should export the setLabel method')
  t.ok(fbNunjucksHelpers.setItemsLabel, 'it should export the setItemsLabel method')
  t.ok(fbNunjucksHelpers.setContent, 'it should export the setContent method')
  t.ok(fbNunjucksHelpers.setWidthClass, 'it should export the setWidthClass method')
  t.ok(fbNunjucksHelpers.setInputWidthClass, 'it should export the setInputWidthClass method')

  t.end()
})

test('When callBlock is called', t => {
  const nunjucksEnv = getEnv(defaultViewPaths)

  const blockId = 'blockId'
  const blockTemplate = `
  {{ callBlock({
    _id: "${blockId}",
    _type: "block",
    heading: "blockHeadingValue"
  }) | safe }}`
  const output = nunjucksEnv.renderString(blockTemplate).trim()

  t.equals(output, '<div class="fb-block fb-block-block govuk-form-group" data-block-id="blockId" data-block-type="block">\nblockHeadingValue\n</div>', 'it should render the corresponding block')

  const anotherId = 'anotherBlockId'
  const nestedTemplate = `
{{ callBlock({
  _id: "${anotherId}",
  _type: "anotherblock",
  title: "blockTitleValue",
  block: {
    _id: "innerBlockId",
    _type: "block",
    heading: "innerBlockHeadingValue"
  }
}) | safe }}`
  const nestedOutput = nunjucksEnv.renderString(nestedTemplate).trim()
  t.equals(nestedOutput, '<div class="fb-block fb-block-anotherblock govuk-form-group" data-block-id="anotherBlockId" data-block-type="anotherblock">\nblockTitleValue\n<div class="fb-block fb-block-block govuk-form-group" data-block-id="innerBlockId" data-block-type="block">\ninnerBlockHeadingValue\n</div>\n</div>', 'it should render nested callBlock')

  t.end()
})

test('When callBlock is called', t => {
  const nunjucksEnv = getEnv(defaultViewPaths)

  const blocksId = 'blockId'
  const blocksTemplate = `
{{ callBlocks([{
  _id: "${blocksId}",
  _type: "anotherblock",
  title: "blockTitleValue",
  block: {
    _id: "innerBlockId",
    _type: "block",
    heading: "innerBlockHeadingValue"
  }
},{
  _id: "blockId",
  _type: "block",
  heading: "blockHeadingValue"
}]) | safe }}`
  const output = nunjucksEnv.renderString(blocksTemplate).trim()
  t.equals(output, '<div class="fb-block fb-block-anotherblock govuk-form-group" data-block-id="blockId" data-block-type="anotherblock">\nblockTitleValue\n<div class="fb-block fb-block-block govuk-form-group" data-block-id="innerBlockId" data-block-type="block">\ninnerBlockHeadingValue\n</div>\n</div><div class="fb-block fb-block-block govuk-form-group" data-block-id="blockId" data-block-type="block">\nblockHeadingValue\n</div>', 'it should render nested callBlock')

  t.end()
})
