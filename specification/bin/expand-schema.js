#!/usr/bin/env node
const {schemaUtils} = require('../index')

const schemaObjs = require('./getSchemaObjs')()

const {expandSchema} = schemaUtils(schemaObjs)

const {FBLogger} = require('@ministryofjustice/fb-utils-node')
FBLogger.verbose(true)

const schemaName = process.argv[2]
if (!schemaName) {
  FBLogger('Please pass a schema name')
  process.exit(1)
}

expandSchema(schemaName)
  .then(function (schema) {
    FBLogger(JSON.stringify(schema, null, 2))
    FBLogger('properties', JSON.stringify(Object.keys(schema.properties), null, 2))
    FBLogger('--------')
    process.exit(0)
  })
  .catch(function (err) {
    FBLogger('Unexpected error', err)
    process.exit(1)
  })
