#!/usr/bin/env node

'use strict';

const ace = require('../core/ace.js');
const meow = require('meow');

const cli = meow(`
  Usage
    $ ace [options] <input>

  Options
    -o, --outdir  <path>   save final reports to the specified directory
    -t, --tempdir <path>   specify a custom directory to store the temporary reports

  Examples
    $ ace -o out ~/Documents/book.epub
`, {
  alias: {
    h: 'help',
    o: 'outdir',
    t: 'tempdir',
  },
});

// console.log(args.input);
// console.log(args.flags);

if (cli.input.length === 0) {
  console.log('Input required');
  cli.showHelp();
  process.exit(1);
}

ace(cli.input[0], {
  cwd: cli.flags.cwd || process.cwd(),
  outdir: cli.flags.outdir,
  tmpdir: cli.flags.tempdir,
});
