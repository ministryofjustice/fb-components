# @ministryofjustice/fb-components

UI components for Form Builder described in [JSON Schema](https://json-schema.org/) with supporting [Nunjucks](https://mozilla.github.io/nunjucks/) templates and helpers.

## Installation

```
npm i -P @ministryofjustice/fb-components
```

## Overview

Components for Form Builder are described with the [JSON Schema](https://json-schema.org/) vocabulary in discrete JSON files. They are contained in the directory `specifications`.

Data objects (which satisfy the schemas and are consumed by the Form Builder application) are contained in the directory `metadata`.

Nunjucks templates and helpers are contained in the directory `templates` (but note that _the template for an individual component_ is contained in a directory named `templates` _beside the schema for the component_.)

## JSON Schemas

### `$id` and `$ref`

Each schema has an `$id`. Many schemas have one or more `$ref` attributes. Superficially, both are URIs, but they require additional processing at runtime to resolve.

For instance, the definition for a button component may resemble this schema:

```
{
  "$id": "http://gov.uk/schema/v1.0.0/definition/button",
  "_name": "definition.button",
  "title": "Button component definition"
}
```
And that definition may be referenced elsewhere:

```
{
  "$id": "http://gov.uk/schema/v1.0.0/button",
  "_name": "button",
  "title": "Button component",
  "allOf: [
    {
      "$ref": "http://gov.uk/schema/v1.0.0/definition/button"
    }
  ]
}
```

But neither the `$id` nor the `$ref` URIs resolve to a _location_ accessible with HTTP.

Instead these URIs must be transformed and mapped to the location of the schema, wherever it is.

That location can be determined in two steps:

1. The fragment `http://gov.uk/schema/v1.0.0` of the URI should map to the `specifications` directory wherever `@ministryofjustice/fb-components-core` is installed or hosted. (The location may be on the file system or at a resource on the internet)

2. The remainder of the URI should be used to compute the path to that particular JSON Schema file, such that `/definition/button` becomes `/definition/button/definition.button.schema.json`

While these patterns are internally consistent and the schemas can be validated with some tools, such as [AJV](https://www.npmjs.com/package/ajv), they cannot be dereferenced by other tools, such as [JSON Schema $Ref Parser](https://www.npmjs.com/package/json-schema-ref-parser), without an additional processing step.

### Circularity and recursion in the JSON Schemas

The schemas are highly referential and some represent tree structures which validators can interpret as circular. Circular references cannot easily be transformed to JSON and the schemas may fail validation, depending on the tool.

Recursion is isolated to schemas which define _conditional_ behaviour, and specifically conditions which can themselves have conditions:

* `/specifications/definition/conditional/boolean/definition.conditional.boolean.schema.json`
* `/specifications/definition/conditions/any/definition.conditions.all.schema.json`
* `/specifications/definition/conditions/all/definition.conditions.any.schema.json`
* `/specifications/definition/conditions/exactly/definition.conditions.exactly.schema.json`

These conditions are tree structures which can resolve.

## About this project

This project combines three deprecated projects:

1. `@ministryofjustice/fb-components-core`
2. `@ministryofjustice/fb-nunjucks-helpers`
3. `@ministryofjustice/fb-specification`
