'use strict';

const ace = require('../src/core/ace');

function runAce(epub, {
    cwd = process.cwd(),
    outdir,
    tmpdir,
    verbose = false,
    silent = true,
  } = {}) {
  return ace(epub, {
    cwd,
    outdir,
    tmpdir,
    verbose,
    silent,
  });
}

module.exports = runAce;
