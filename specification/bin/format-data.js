#!/usr/bin/env node

const path = require('path')
const getComponentsPath = require('./get-components-path')
const shell = require('shelljs')

const componentsPath = path.relative(process.cwd(), getComponentsPath()) || '.'

shell.exec(`find ${componentsPath}/specifications/**/data -name "*.json" | xargs -P 20 -L 1 jsonlint -qi`)
