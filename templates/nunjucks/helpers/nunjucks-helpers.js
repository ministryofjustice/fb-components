require('@ministryofjustice/module-alias/register-module')(module)

const nunjucksMacroHelpers = require('./nunjucks-macro-helpers')
const nunjucksDataHelpers = require('./nunjucks-data-helpers')

const {version} = require('~/fb-components/package')

function addBlockInfoFilter (block, {_id, _type}) {
  return block
    .replace(/\s*(<\w+[^>]+)/, (match, value) => _id ? `${value} data-block-id="${_id}" data-block-type="${_type}"` : match)
    .replace(/(class=")/, `$1fb-block fb-block-${_type} `)
}

function initialiseMacroHelpers (env) {
  nunjucksMacroHelpers.init(env)
    .addFilter('addBlockInfo', addBlockInfoFilter)
    .renderString(`
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
  return env
}

function initialiseDataHelpers (env, options) {
  return nunjucksDataHelpers.init(env, options)
}

const init = (env, options) => initialiseDataHelpers(initialiseMacroHelpers(env), options)

module.exports = Object.assign({}, nunjucksMacroHelpers, nunjucksDataHelpers, {init})
