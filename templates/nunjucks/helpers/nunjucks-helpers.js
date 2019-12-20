require('@ministryofjustice/module-alias/register-module')(module)

const nunjucksMacroHelpers = require('./nunjucks-macro-helpers')
const nunjucksDataHelpers = require('./nunjucks-data-helpers')

const {version} = require('~/fb-components/package')

const init = (env, options) => {
  let nunjucksEnv = nunjucksMacroHelpers.init(env)

  nunjucksEnv.addFilter('addBlockInfo', (str, params) => {
    const output = str.replace(/\s*(<\w+[^>]+)/, (m, m1) => {
      if (!params._id) {
        return m
      }
      return `${m1} data-block-id="${params._id}" data-block-type="${params._type}"`
    }).replace(/(class=")/, `$1fb-block fb-block-${params._type} `)
    return output
  })

  nunjucksEnv.renderString(`
{{ addGlobal('version', '${version}') }}
{% macro callBlock(data) -%}
{% set blockOutput %}{{ callMacro(data._type, data) }}{% endset %}
{{- blockOutput | addBlockInfo(data) | safe -}}
{%- if data.$addBlock -%}
{{- callBlock(data.$addBlock) -}}
{%- endif -%}
{%- endmacro %}
{{ addGlobal('callBlock', callBlock) }}
{% macro callBlocks(blocks, addBlock) -%}
{% for block in blocks -%}
{{- callBlock(block) -}}
{%- endfor %}
{%- if addBlock -%}
{{- callBlock(addBlock) -}}
{%- endif -%}
{%- endmacro %}
{{ addGlobal('callBlocks', callBlocks) }}
{% macro callComponents(data, property) -%}
{% set addBlock = data['$addBlock' + property] %}
{{ callBlocks(data[property], addBlock) }}
{%- endmacro %}
{{ addGlobal('callComponents', callComponents) }}
  `)

  nunjucksEnv = nunjucksDataHelpers.init(nunjucksEnv, options)

  return nunjucksEnv
}

module.exports = Object.assign({}, nunjucksMacroHelpers, nunjucksDataHelpers, {
  init
})
