#!/bin/sh

rm -rf ./CompareAxeRunners
echo "PuppeteerAxeRunner ..."
ACE_PERF=1 node ./packages/ace-cli/bin/ace.js -f -V -o ./CompareAxeRunners/PuppeteerAxeRunner "$1"
echo "ElectronAxeRunner ..."
ACE_PERF=1 node node_modules/electron/cli.js ./packages/ace-axe-runner-electron/lib/cli.js -f -V -o ./CompareAxeRunners/ElectronAxeRunner "$1"
echo "Report difference:"
node node_modules/json-diff/bin/json-diff.js ./CompareAxeRunners/PuppeteerAxeRunner/report.json ./CompareAxeRunners/ElectronAxeRunner/report.json
