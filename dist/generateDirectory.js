"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ora = require("ora");
var path = require("path");
var actions = require("./actions");
var GenerateDirectory = /** @class */ (function () {
    function GenerateDirectory(srcDir, distDir) {
        this.copying(srcDir, distDir);
    }
    GenerateDirectory.prototype.copying = function (srcDir, distDir) {
        var source = path.join(srcDir ? srcDir : process.cwd(), '.setup-folder');
        this.spinning('Copying files...', function () { return actions.copy(source, distDir); });
    };
    GenerateDirectory.prototype.spinning = function (str, next) {
        var spinner = ora(str).start();
        next();
        spinner.stop();
    };
    return GenerateDirectory;
}());
exports.GenerateDirectory = GenerateDirectory;
