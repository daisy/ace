#!/bin/sh

rm -rf ./CompareAxeRunners

echo "ElectronAxeRunner ..."
#node node_modules/electron/cli.js ./packages/ace-axe-runner-electron/lib/cli.js
#node ./packages/ace-axe-runner-electron/bin/ace.js
#node ./packages/ace/bin/ace-electron.js
ACE_PERF=1 node ./packages/ace/bin/ace-electron.js -f -V -o ./CompareAxeRunners/ElectronAxeRunner "$1"

echo "PuppeteerAxeRunner ..."
ACE_PERF=1 node ./packages/ace-cli/bin/ace.js -f -V -o ./CompareAxeRunners/PuppeteerAxeRunner "$1"

node ./scripts/normalise_report_json.js ./CompareAxeRunners/PuppeteerAxeRunner/report.json
node ./scripts/normalise_report_json.js ./CompareAxeRunners/ElectronAxeRunner/report.json

echo "Report difference:"
node node_modules/json-diff/bin/json-diff.js ./CompareAxeRunners/PuppeteerAxeRunner/report_normalised.json ./CompareAxeRunners/ElectronAxeRunner/report_normalised.json
