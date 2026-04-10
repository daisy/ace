#!/bin/bash

#yarn cache clean
#yarn run clean-node-modules
rm -rf node_modules

#rm -f yarn.lock
#sfw yarn install --ignore-scripts --network-timeout 1000000

yarn install --frozen-lockfile --ignore-scripts --network-timeout 1000000

cd node_modules/electron
yarn --verbose --network-timeout 1000000 run postinstall
cd ../..

cd node_modules/puppeteer
rm -rf ~/.cache/puppeteer/
yarn --verbose --network-timeout 1000000 run postinstall
cd ../..

yarn --verbose run postinstall

#yarn run test-cli

#yarn run test-electron-cli

#yarn run test

#yarn run test-electron
