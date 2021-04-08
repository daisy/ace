'use strict';

const axeRunner = require('@daisy/ace-axe-runner-puppeteer');
const cli = require('@daisy/ace-cli-shared');

async function run() {
  await cli.run(axeRunner, process.exit, (typeof process.env.JEST_TESTS !== "undefined" ? "ace-tests-cli.log" : "ace-cli.log"));
}

module.exports = { run };
