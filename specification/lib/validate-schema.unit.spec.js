const test = require('tape')
const path = require('path')
const glob = require('glob-promise')
const stdout = require('test-console').stdout

const validateSchema = require('./validate-schema')

const specsAPath = path.resolve(__dirname, '../data/specs-a')

const specs = [{
  path: specsAPath,
  $idRoot: 'http://gov.uk/schema/v1.0.0'
}]

const definitionData = path.join(specsAPath, 'specifications/definition/data/data')

const definitionValid = path.join(definitionData, 'valid')
const definitionInvalid = path.join(definitionData, 'invalid')
const validFiles = glob.sync(`${definitionValid}/**.json`)
const invalidFiles = glob.sync(`${definitionInvalid}/**.json`)

const getExpected = (file) => {
  return require(path.join(__dirname, '../data/expected', `${file}.json`))
}

const updateFixedPaths = (result) => {
  result.forEach(individualResult => {
    individualResult.path = individualResult.path.replace(/.*\/data\/specs-a/, '/data/specs-a')
  })
  return result
}

test('When validating the default valid and invalid files against a schema', t => {
  t.plan(1)

  validateSchema('definition.data', {specs})
    .then(result => {
      t.equal(result, undefined, 'it should not report any errors')
    })
})

test('When validating valid files explicitly against a schema', t => {
  t.plan(2)

  const inspect = stdout.inspect()
  validateSchema('definition.data', {specs, valid: validFiles})
    .then(result => {
      inspect.restore()
      const consoleOutput = inspect.output[0]
      t.equal(result, undefined, 'it should not report any errors')
      t.equal(consoleOutput, undefined, 'it should not issue any warnings')
    })
})

test('When validating valid files explicitly against a schema but asking to warn about missing test files', t => {
  t.plan(2)
  const inspect = stdout.inspect()
  validateSchema('definition.data', {specs, warn: true, valid: validFiles})
    .then(result => {
      inspect.restore()
      const consoleOutput = inspect.output[0].trim()
      t.equal(result, undefined, 'it should not report any errors')
      t.equal(consoleOutput, 'WARN - no invalid json found for definition.data', 'it should warn that no invalid files could be found')
    })
})

test('When validating invalid files explicitly against a schema', t => {
  t.plan(2)

  const inspect = stdout.inspect()
  validateSchema('definition.data', {specs, invalid: invalidFiles})
    .then(result => {
      inspect.restore()
      const consoleOutput = inspect.output[0]
      t.equal(result, undefined, 'it should not report any errors')
      t.equal(consoleOutput, undefined, 'it should not issue any warnings')
    })
})

test('When validating invalid files explicitly against a schema but asking to warn about missing test files', t => {
  t.plan(2)
  const inspect = stdout.inspect()
  validateSchema('definition.data', {specs, warn: true, invalid: invalidFiles})
    .then(result => {
      inspect.restore()
      const consoleOutput = inspect.output[0].trim()
      t.equal(result, undefined, 'it should not report any errors')
      t.equal(consoleOutput, 'WARN - no valid json found for definition.data', 'it should warn that no valid files could be found')
    })
})

test('When validating files that are expected to be valid against a schema but which are not', t => {
  t.plan(2)

  const expected = getExpected('specs-expected-valid')

  validateSchema('definition.data', {specs, valid: invalidFiles})
    .then(result => {
      const valid = result.valid
      const dataSrc = '/data/specs-a/specifications/definition/data/data/invalid/'
      const correctPaths = valid[0].path.includes(`${dataSrc}definition.data.invalid._id.json`) &&
        valid[1].path.includes(`${dataSrc}definition.data.invalid._type.json`) &&
        valid[2].path.includes(`${dataSrc}definition.data.invalid.double.error.json`)
      t.equal(correctPaths, true, 'it should report the correct paths for the reported errors')
      updateFixedPaths(valid)
      // valid.forEach(validError => {
      //   validError.path = validError.path.replace(/.*\/data\/specs-a/, '/data/specs-a')
      // })
      t.deepEqual(result, expected, 'it should report the correct errors')
    })
})

test('When validating files that are expected to be invalid against a schema but which are not', t => {
  t.plan(2)

  const expected = getExpected('specs-expected-invalid')

  validateSchema('definition.data', {specs, invalid: validFiles})
    .then(result => {
      const invalid = result.invalid
      const dataSrc = '/data/specs-a/specifications/definition/data/data/valid/'
      const correctPaths = invalid[0].path.includes(`${dataSrc}definition.data.json`) &&
      invalid[1].path.includes(`${dataSrc}definition.data.optional.json`)
      t.equal(correctPaths, true, 'it should report the correct paths for the reported errors')
      updateFixedPaths(invalid)
      // invalid.forEach(validError => {
      //   validError.path = validError.path.replace(/.*\/data\/specs-a/, '/data/specs-a')
      // })
      t.deepEqual(result, expected, 'it should report the correct errors')
    })
})

test('When validating against a schema and requesting debug information', t => {
  t.plan(1)

  const inspect = stdout.inspect()
  validateSchema('definition.data', {specs, debug: true})
    .then(result => {
      inspect.restore()
      const consoleOutput = inspect.output[0].trim()
      const expectedOutput = consoleOutput.startsWith('{\n  "files": [\n    [\n')
      t.equal(expectedOutput, true, 'it should output the debug information about which files will be processed')
    })
})

test('When validating against a schema and requesting debug information but warning is enabled', t => {
  t.plan(1)

  const inspect = stdout.inspect()
  validateSchema('definition.data', {specs, debug: true, warn: true})
    .then(result => {
      inspect.restore()
      const consoleOutput = inspect.output[0]
      t.equal(consoleOutput, undefined, 'it should not output the debug information')
    })
})

test('When validating against a schema and encountering more than one error', t => {
  t.plan(2)
  const doubleError = [`${definitionInvalid}/definition.data.invalid.double.error.json`]

  validateSchema('definition.data', {specs, valid: doubleError})
    .then(result => {
      const expected = getExpected('specs-expected-double.error')
      updateFixedPaths(result.valid)
      t.deepEqual(result, expected, 'it should report all the errors encountered')
    })

  validateSchema('definition.data', {specs, valid: doubleError, allErrors: false})
    .then(result => {
      const expected = getExpected('specs-expected-double.error.show-first')
      updateFixedPaths(result.valid)
      t.deepEqual(result, expected, 'it should only report the first error encountered')
    })
})

// test('When validating a file that determines its schema automatially', t => {
//   t.plan(1)

//   validateSchema(undefined, {
//     specs,
//     valid: [`${definitionValid}definition.data.json`]
//   })
//     .then(result => {
//       t.equal(result, undefined, 'it should just work')
//     })
// })
