#!/usr/bin/env node

import './utils/polyfill'

import * as commander from 'commander'

import chalk from 'chalk'

import * as generateDirectory from './core/generateDirectory'

const pjson = require('../package.json');

commander
  .version(pjson.version)
  .description(pjson.description)

commander
  .command('new <name> [srcDir]')
  .description('create a project')
  .action((name, srcDir) => {
    console.log(chalk.yellow('=========*** Create your new app:'), chalk.blue(name), chalk.yellow('***=========='))
    const gen = new generateDirectory.GenerateDirectory(srcDir, process.cwd())
    gen.fullGeneration()
  })

if (!process.argv.slice(2).length) {
    commander.outputHelp()
    process.exit()
}
commander.parse(process.argv)