#!/usr/bin/env node

const {
  test
} = require('tap')

const glob = require('glob-promise')
const path = require('path')

const getComponentsPath = require('./get-components-path')
const getSchemaObjs = require('./getSchemaObjs')

const validateSchema = require('../lib/validate-schema')

const componentsPath = getComponentsPath()

const schemas = glob.sync(`${componentsPath}/specifications/**/*.schema.json`)
  .map(schema => path.resolve(schema))

const schemaObjs = getSchemaObjs(componentsPath)

schemas.forEach(schema => {
  const schemaName = schema.replace(/.*\//, '').replace(/\.schema\.json/, '')
  test(schemaName, t => {
    t.plan(1)

    const options = {}
    options.specs = schemaObjs
    options.path = schema.replace(/\/[^/]+$/, '')
    options.warn = true

    return validateSchema(schema, options)
      .then(results => {
        t.is(results, undefined, 'should have no errors')
      })
  })
})
