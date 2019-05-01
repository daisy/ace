'use strict';

const ace = require('@daisy/ace-core');
const logger = require('@daisy/ace-logger');

const axeRunner = require('@daisy/ace-axe-runner-puppeteer');

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
  }, axeRunner);
}

module.exports = runAce;
