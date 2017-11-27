#!/usr/bin/env node


'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs');
const meow = require('meow');
const path = require('path');
const winston = require('winston');

const ace = require('../core/ace.js');
const logger = require('../core/logger.js');
const util = require('../core/utils/get-all-rules');

const cli = meow(`
  Usage: ace [options] <input>

  Options:

    -h, --help             output usage information
    -v, --version          output the version number

    -o, --outdir  <path>   save final reports to the specified directory
    -t, --tempdir <path>   specify a custom directory to store the temporary reports
    -f, --force            override any existing output file or directory
        --subdir           output reports to a sub-directory named after the input EPUB

    -V, --verbose          display verbose output
    -s, --silent           do not display any output
    -R, --rules            To get information on all the internal used rules 

  Examples
    $ ace -o out ~/Documents/book.epub
`, {
  alias: {
    f: 'force',
    h: 'help',
    o: 'outdir',
    s: 'silent',
    t: 'tempdir',
    v: 'version',
    V: 'verbose',
    R: 'rules'
  },
  boolean: ['force', 'verbose', 'silent', 'subdir', 'rules'],
  string: ['outdir', 'tempdir']
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(() => {
  var _ref = _asyncToGenerator(function* () {

    if (cli.flags.rules) {
      console.log('Write rules description to ./rules.html...');
      fs.writeFileSync('./rules.html', util.getAllRulesAsHTML());
      console.log('Written rules description to ./rules.html');
      process.exit(1);
    }
    logger.initLogger({ verbose: cli.flags.verbose, silent: cli.flags.silent });

    // Check that an EPUB path is specified
    if (cli.input.length === 0) {
      winston.logAndExit('error', 'Input required', function () {
        console.log(cli.help);
        process.exit(1);
      });
      yield sleep(5000);
      process.exit(1);
    }

    // Check that output directories can be overridden
    let outdir = cli.flags.outdir;
    if (outdir) {
      if (cli.flags.subdir) {
        outdir = path.join(outdir, path.parse(cli.input[0]).name);
      }
      if (!cli.flags.force) {
        const overrides = ['report.json', 'report.html', 'data', 'js'].map(function (file) {
          return path.join(outdir, file);
        }).filter(fs.existsSync);
        if (overrides.length > 0) {
          winston.logAndExit('warn', `\
Output directory is not empty.

  Running Ace would override the following files or directories:

${overrides.map(function (file) {
            return `  - ${file}`;
          }).join('\n')}

  Use option --force to override.
`, 1);
          yield sleep(5000);
          process.exit(1);
        }
      }
    }

    // finally, invoke Ace
    ace(cli.input[0], {
      cwd: cli.flags.cwd || process.cwd(),
      outdir,
      tmpdir: cli.flags.tempdir,
      verbose: cli.flags.verbose,
      silent: cli.flags.silent,
      jobId: ''
    }).catch(function (err) {
      if (err && err.message) winston.error(err.message);
      winston.logAndExit('info', 'Closing logs.', function () {
        console.log('Re-run Ace using the --verbose option to enable full debug logging.');
        process.exit(1);
      });
    });
  });

  function processArgs() {
    return _ref.apply(this, arguments);
  }

  return processArgs;
})()();