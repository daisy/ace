#!/bin/sh

rm -rf ./CompareAxeRunners

echo "ElectronAxeRunner ..."
#node node_modules/electron/cli.js ./packages/ace-axe-runner-electron/lib/cli.js
#node ./packages/ace-axe-runner-electron/bin/ace.js
#node ./packages/ace/bin/ace-electron.js

# defaults: ACE_TIMEOUT_INITIAL=5000 ACE_TIMEOUT_EXTENSION=240000
# ACE_TIMEOUT_INITIAL ==> load and Axe
# ACE_TIMEOUT_EXTENSION ==> Axe...
# -T/--timeout 100 means 100 milliseconds over the initial 5 seconds for Axe to do its job
ACE_PERF=1 node ./packages/ace/bin/ace-electron.js -T 100 -l en -f -V -o ./CompareAxeRunners/ElectronAxeRunner "$1"

echo "PuppeteerAxeRunner ..."

# defaults: ACE_TIMEOUT_INITIAL=5000 ACE_TIMEOUT_EXTENSION=240000
# ACE_TIMEOUT_INITIAL ==> load
# ACE_TIMEOUT_EXTENSION ==> Axe...
# -T/--timeout 5100 means 5 seconds and 100 milliseconds for Axe to do its job
ACE_PERF=1 node ./packages/ace-cli/bin/ace.js -T 5100 -l en -f -V -o ./CompareAxeRunners/PuppeteerAxeRunner "$1"

node ./scripts/normalise_report_json.js ./CompareAxeRunners/PuppeteerAxeRunner/report.json
node ./scripts/normalise_report_json.js ./CompareAxeRunners/ElectronAxeRunner/report.json

echo "Report difference:"
node node_modules/json-diff/bin/json-diff.js ./CompareAxeRunners/PuppeteerAxeRunner/report_normalised.json ./CompareAxeRunners/ElectronAxeRunner/report_normalised.json
