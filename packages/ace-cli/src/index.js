'use strict';

const axeRunner = require('@daisy/ace-axe-runner-puppeteer');
const cli = require('@daisy/ace-cli-shared');

async function run() {
  cli.run(axeRunner, process.exit);
}

module.exports = { run };
