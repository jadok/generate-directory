#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./utils/polyfill");
var commander = require("commander");
var chalk_1 = require("chalk");
var generateDirectory = require("./core/generateDirectory");
var pjson = require('../package.json');
commander
    .version(pjson.version)
    .description(pjson.description);
commander
    .command('new <name> [srcDir]')
    .description('create a project')
    .action(function (name, srcDir) {
    console.log(chalk_1.default.yellow('=========*** Create your new app:'), chalk_1.default.blue(name), chalk_1.default.yellow('***=========='));
    var gen = new generateDirectory.GenerateDirectory(srcDir, process.cwd());
    gen.fullGeneration();
});
if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}
commander.parse(process.argv);
