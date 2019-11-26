const path = require('path')
const $RefParser = require('json-schema-ref-parser')
const mergeAllOf = require('json-schema-merge-allof')

const glob = require('glob-promise')

const {FBError} = require('@ministryofjustice/fb-utils-node')
class FBSchemaError extends FBError { }

const schemaUtils = (specs = [{}]) => {
  const specsPathMap = {}
  const specsNamePrefix = {}
  const specsIdRootToNameMap = {}
  specs.forEach(spec => {
    specsPathMap[spec.$idRoot] = spec.path
    const namePrefix = spec.$idRoot
      .replace(/.*\/v\d+\.\d+\.\d+\/*/, '')
      .replace(/\//g, '.')
    specsNamePrefix[namePrefix] = spec.$idRoot
    specsIdRootToNameMap[spec.$idRoot] = namePrefix
  })

  const specsPathMatchOrder = specs.map(spec => spec.$idRoot)
    .sort().reverse()

  const mapIdToIdRoot = (schemaUrl) => {
    for (let index = 0; index < specsPathMatchOrder.length; index++) {
      const idRoot = specsPathMatchOrder[index]

      if (schemaUrl.startsWith(idRoot)) {
        return idRoot
      }
    }

    throw new FBSchemaError('Schema URL cannot be resolved', {data: {schemaUrl}})
  }

  const mapIdToDir = (schemaUrl) => {
    const idRoot = mapIdToIdRoot(schemaUrl)

    return specsPathMap[idRoot]
  }

  const mapIdRootToNamePrefix = (idRoot) => specsIdRootToNameMap[idRoot]

  const specsNamePrefixMatchOrder = Object.keys(specsNamePrefix)
    .sort().reverse()

  const mapNameToIdRoot = (name) => {
    for (let index = 0; index < specsNamePrefixMatchOrder.length; index++) {
      const nameRoot = specsNamePrefixMatchOrder[index]
      if (!nameRoot) {
        return specsNamePrefix[nameRoot]
      }
      if (name.startsWith(`${nameRoot}.`)) {
        return specsNamePrefix[nameRoot]
      }
    }
  }

  const mapIdToName = (id) => {
    const idRoot = mapIdToIdRoot(id)
    const namePrefix = mapIdRootToNamePrefix(idRoot)

    let name = id.replace(`${idRoot}/`, '')
    if (namePrefix) {
      name = `${namePrefix}.${name}`
    }

    return name.replace(/\//g, '.')
  }

  const mapNameToPath = (name) => {
    const idRoot = mapNameToIdRoot(name)
    const namePrefix = mapIdRootToNamePrefix(idRoot)
    const idRootPath = mapIdToDir(idRoot)
    const namePrefixRegex = new RegExp(`^${namePrefix}\\.`)

    let namePath = name
      .replace(namePrefixRegex, '')
      .replace(/\./g, '/')

    if (namePath) {
      namePath += '/'
    }

    return `${idRootPath}/specifications/${namePath}${name}.schema.json`
  }

  const mapIdToPath = (id) => {
    const name = mapIdToName(id)

    return mapNameToPath(name)
  }

  const specsMatchStr = `^(${specs.map(spec => spec.$idRoot).sort().reverse().join('|')}).+`
    .replace(/\//g, '\\/')

  const specsMatch = new RegExp(specsMatchStr)

  let protectedRefs = []

  const $idRoots = {}
  specs.forEach(spec => {
    $idRoots[spec.$idRoot] = spec.path
    if (spec.protected) {
      protectedRefs = protectedRefs.concat(spec.protected.map(protectedValue => `${spec.$idRoot}/${protectedValue}`))
    }
  })

  let protectedMatch
  if (protectedRefs.length) {
    const protectedMatchStr = `"\\$ref":\\s*("${protectedRefs.join('|')}")`
    protectedMatch = new RegExp(protectedMatchStr, 'g')
  }

  const load = () => {
    const schemas = {}
    return Promise.all(specs.map(spec => _load(schemas, spec.path))).then(() => schemas)
  }

  const _load = (schemas, specsPath) => {
    const specSchemas = `${specsPath}/specifications/**/*.schema.json`
    const schemaPaths = glob.sync(specSchemas)

    const loadSchema = schemaPath => {
      const schema = require(schemaPath)
      const name = getSchemaName(schema)
      return expandSchema(name, {path: specsPath})
        .then(loadedSchema => {
          schemas[name] = loadedSchema
        })
    }
    return Promise.all(schemaPaths.map(loadSchema))
  }

  const getSchemaName = (schema) => schema._name

  const getSchemaDir = (name) => getSchemaPath(name).replace(/\/[^/]+$/, '')

  const getSchemaPath = (name) => {
    return name.endsWith('.schema.json')
      ? name
      : mapNameToPath(name)
  }

  const rawSchemas = {}

  const getRawSchema = (name) => {
    if (!name.endsWith('.json')) {
      name = name.replace(/\//g, '.')
    }

    if (!rawSchemas[name]) {
      const schemaPath = getSchemaPath(name)
      const loaded = require(path.resolve(schemaPath))
      rawSchemas[name] = loaded
    }

    return rawSchemas[name]
  }

  const doLoad = name => {
    const loaded = getRawSchema(name)
    let refSchema = JSON.stringify(loaded)
    if (protectedMatch) {
      refSchema = refSchema.replace(protectedMatch, '"PROTECTEDREF": $1')
    }
    refSchema = JSON.parse(refSchema)
    return refSchema
  }

  const expandedSchemas = {}

  const recurseResolver = (id) => {
    if (expandedSchemas[id]) {
      return Promise.resolve(expandedSchemas[id])
    }

    const schemaPath = mapIdToPath(id)
    const refSchema = doLoad(schemaPath)
    return dereference(refSchema)
  }

  const matchedResolver = {
    order: 1,
    canRead: specsMatch,
    read: function (file, callback) {
      return recurseResolver(file.url)
        .then(document => {
          callback(null, document)
        })
    }
  }

  const dereference = (schema) => {
    return $RefParser.dereference(schema, {
      resolve: {
        $idRootMatch: matchedResolver
      },
      dereference: {
        circular: 'ignore'
      }
    })
      .then(schema => {
        const processedSchema = mergeAllOf(schema, {
          resolvers: {
            type: values => values[0],
            const: values => values[0],
            category: (values, path, mergeSchemas, options) => {
              const flattened = values.reduce((acc, val) => acc.concat(val), [])
              return Array.from(new Set(flattened)).sort()
            },
            _name: values => values[0]
          }
        })
        expandedSchemas[processedSchema.$id] = processedSchema
        return processedSchema
      })
  }

  const expandSchema = (schema) => {
    let dataSchema
    try {
      dataSchema = doLoad(schema)
    } catch (e) {
      return Promise.reject(new FBSchemaError(`Could not load ${schema}`, {error: e}))
    }
    return dereference(dataSchema)
      .then(schema => {
        let processedSchema = JSON.stringify(schema)
        processedSchema = processedSchema.replace(/PROTECTEDREF/g, '$ref')
        processedSchema = JSON.parse(processedSchema)
        return processedSchema
      })
  }

  return {
    load,
    getSchemaName,
    getSchemaDir,
    getSchemaPath,
    getRawSchema,
    expandSchema
  }
}

module.exports = schemaUtils
