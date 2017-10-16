'use strict';

const ace = require('../src/core/ace');
const logger = require('../src/core/logger');

function runAce(epub, {
    cwd = process.cwd(),
    outdir,
    tmpdir,
    verbose = false,
    silent = true,
  } = {}) {
  logger.initLogger({ verbose, silent });
  return ace(epub, {
    cwd,
    outdir,
    tmpdir,
    verbose,
    silent,
  });
}

module.exports = runAce;
