#!/usr/bin/env node

'use strict';

const ace = require('../core/ace.js');
const meow = require('meow');
const winston = require('winston');

const cli = meow(`
  Usage
    $ ace [options] <input>

  Options
    -o, --outdir  <path>   save final reports to the specified directory
    -t, --tempdir <path>   specify a custom directory to store the temporary reports
    -v, --version          print the version number
    -b, --verbose          display verbose output
    -s, --silent           do not display any output

  Examples
    $ ace -o out ~/Documents/book.epub
`, {
  alias: {
    h: 'help',
    o: 'outdir',
    t: 'tempdir',
    b: 'verbose',
    s: 'silent'
  },
});

if (cli.input.length === 0) {
  console.log('Input required');
  cli.showHelp();
  process.exit(1);
}

ace(cli.input[0], {
  cwd: cli.flags.cwd || process.cwd(),
  outdir: cli.flags.outdir,
  tmpdir: cli.flags.tempdir,
  verbose: cli.flags.verbose,
  silent: cli.flags.silent,
  jobId: '',
})
.catch((err) => {
  winston.error(err.message);
  process.exit(1);
});
