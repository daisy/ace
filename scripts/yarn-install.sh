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

yarn build

yarn test-cli

yarn test-electron-cli



