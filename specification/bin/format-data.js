#!/usr/bin/env node

const shell = require('shelljs')

shell.exec('find components-core/specifications/**/data -name "*.json" | xargs -P 20 -L 1 jsonlint -qi')
