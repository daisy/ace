#!/bin/bash

rm -rf node_modules
yarn install --ignore-scripts

cd node_modules/electron
yarn --verbose run postinstall
cd ../..

cd node_modules/puppeteer
rm -rf ~/.cache/puppeteer/
yarn --verbose run postinstall
cd ../..

yarn --verbose run postinstall

#yarn run test-cli

#yarn run test-electron-cli

#yarn run test

#yarn run test-electron
