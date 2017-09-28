#!/usr/bin/env node

'use strict';

const ace = require('../core/ace.js');

const fs = require('fs');
const meow = require('meow');
const path = require('path');
const logger = require('./logger.js');

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
  },
  boolean: ['force', 'verbose', 'silent', 'subdir'],
  string: ['outdir', 'tempdir'],
});

logger.initLogger({verbose: cli.flags.verbose, silent: cli.flags.silent});

// Check that an EPUB path is specified
if (cli.input.length === 0) {
  winston.error('Input required');
  cli.showHelp(1);
}

// Check that output directories can be overridden
let outdir = cli.flags.outdir;
if (outdir) {
  if (cli.flags.subdir) {
    outdir = path.join(outdir, path.parse(cli.input[0]).name);
  }
  if (!cli.flags.force) {
    const overrides = ['ace.json', 'report.html', 'data', 'js']
      .map(file => path.join(outdir, file))
      .filter(fs.existsSync);
    if (overrides.length > 0) {
      winston.warn(`\
Output directory is not empty.

Running Ace would override the following files or directories:

${overrides.map(file => `  - ${file}`).join('\n')}

Use option --force to override.
`);
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
  if (err) winston.error(err.message);
  process.exit(1);
});
