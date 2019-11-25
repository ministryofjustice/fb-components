#!/usr/bin/env node
const glob = require('glob-promise')
const validateSchema = require('../lib/validate-schema')

// let {schemas: specs} = require('../index')

const {FBError, FBLogger} = require('@ministryofjustice/fb-utils-node')
class FBValidateError extends FBError { }

FBLogger.verbose(true)

const argv = require('yargs')
  .version(false)
  .help()
  .alias('help', 'h')
  .option('quiet', {
    alias: 'q',
    description: 'Only show names of failing data files',
    default: false
  })
  .option('schema', {
    alias: 's',
    description: 'Validate named schema with test data',
    type: 'string'
  })
  .option('invalid', {
    alias: 'i',
    description: 'Input is expected to be invalid',
    type: 'boolean',
    default: false
  })
  .option('path', {
    alias: 'p',
    description: 'Path to specifications directory containing the schemas',
    type: 'array'
  })
  .option('idRoot', {
    alias: 'id',
    description: '$idRoot prefix to resolve $refs in schemas\n\nIf no idRoot and path are passed, package.json in the current directory is checked for a $idRoot property and if found that value is used for idRoot and the current directory for path',
    type: 'array'
  })
  .option('allErrors', {
    alias: 'a',
    description: 'Show all errors instead of failing fast on first - use --no-a to fail fast',
    type: 'boolean',
    default: true
  })
  .option('debug', {
    alias: 'd',
    description: 'Show debug info',
    type: 'boolean',
    default: false
  })
  .check((argv, options) => {
    const {path, schema} = argv
    if (!path && !schema && !argv._.length) {
      return false
    }
    return true
  }).argv

const {schema, invalid, directory, quiet, allErrors, debug} = argv
const {path: schemaPaths, idRoot: idRoots} = argv
let specs = []
try {
  if (schemaPaths && !idRoots) {
    throw new FBValidateError('No value passed for --idRoot when --path passed')
  }
  if (!schemaPaths && idRoots) {
    throw new FBValidateError('No value passed for --path when --idRoot passed')
  }

  if (!schemaPaths && !idRoots) {
    const schemaObjs = require('./getSchemaObjs')()
    if (schemaObjs.length) {
      specs = schemaObjs
    }
  } else if (schemaPaths) {
    if (schemaPaths.length !== idRoots.length) {
      throw new FBValidateError('Different number of values for --path and --idRoot passed', {
        data: argv
      })
    }
    specs = []
    schemaPaths.forEach((item, index) => {
      specs.push({
        path: item,
        $idRoot: idRoots[index]
      })
    })
  }
} catch (e) {
  FBLogger(e.message, e.data)
  process.exit(1)
}

const dataPaths = {
  specs,
  allErrors,
  debug
}
let files
if (argv._.length) {
  const firstArg = argv._[0]
  if (firstArg.includes('*')) {
    FBLogger(`No json files found matching ${argv._[0]}`)
    process.exit(1)
  }
  files = argv._
  if (argv._.length === 1 && !firstArg.endsWith('.json')) {
    files = glob.sync(`${firstArg}/*.json`)
    if (!files.length) {
      FBLogger(`No json files found in ${directory}`)
      process.exit(1)
    }
  }
}
if (files) {
  if (invalid) {
    dataPaths.invalid = files
  } else {
    dataPaths.valid = files
  }
}

validateSchema(schema, dataPaths)
  .then(results => {
    if (!results) {
      FBLogger('OK')
    } else {
      if (quiet) {
        Object.keys(results).forEach(type => {
          FBLogger(`Expected to be ${type} but not`)
          results[type].forEach(result => {
            FBLogger(`- ${result.path}`)
          })
        })
      } else {
        Object.keys(results).forEach(type => {
          FBLogger(`Expecting ${type} input`)
          FBLogger(results[type])
        })
      }
      process.exit(1)
    }
  })
  .catch(e => {
    FBLogger('Processing the data threw an unexpected error', e)
    process.exit(1)
  })
