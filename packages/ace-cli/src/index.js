#!/usr/bin/env node

'use strict';

const fs = require('fs');
const meow = require('meow');
const path = require('path');
const winston = require('winston');

const logger = require('@daisy/ace-logger');
const ace = require('@daisy/ace-core');
const util = require('@daisy/ace-core/lib/core/get-all-rules');

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
    -R, --rules            to get information about all the internal used rules

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
    R: 'rules',
  },
  boolean: ['force', 'verbose', 'silent', 'subdir', 'rules'],
  string: ['outdir', 'tempdir'],
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {

  if (cli.flags.rules) {
    console.log('Write rules description to ./rules.html...');
    fs.writeFileSync('./rules.html', util.getAllRulesAsHTML());
    console.log('Written rules description to ./rules.html');
    process.exit(0);
  }

  logger.initLogger({ verbose: cli.flags.verbose, silent: cli.flags.silent });

  // Check that an EPUB path is specified
  if (cli.input.length === 0) {
    winston.logAndExit('error', 'Input required', () => {
      console.log(cli.help);
      process.exit(1);
    });
    await sleep(5000);
    process.exit(1);
  }

  // Check that output directories can be overridden
  let outdir = cli.flags.outdir;
  if (outdir) {
    if (cli.flags.subdir) {
      outdir = path.join(outdir, path.parse(cli.input[0]).name);
    }
    if (!cli.flags.force) {
      const overrides = ['report.json', 'report.html', 'data', 'js']
        .map(file => path.join(outdir, file))
        .filter(fs.existsSync);
      if (overrides.length > 0) {
        winston.logAndExit('warn', `\
Output directory is not empty.

  Running Ace would override the following files or directories:

${overrides.map(file => `  - ${file}`).join('\n')}

  Use option --force to override.
`, 1);
        await sleep(5000);
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
    jobId: '',
  })
  .catch((err) => {
    if (err && err.message) winston.error(err.message);
    winston.logAndExit('info', 'Closing logs.', () => {
      console.log('Re-run Ace using the --verbose option to enable full debug logging.');
      process.exit(1);
    });
  });
}

module.exports = { run };
