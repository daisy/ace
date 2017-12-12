'use strict';

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');

const config = {
  srcDir: 'src',
  buildDir: 'lib',
  jsPattern: '**/*.js',
  ignorePattern: '**/*.test.js',
};

function listPackages() {
  return fs
    .readdirSync(PACKAGES_DIR)
    .map(file => path.resolve(PACKAGES_DIR, file))
    .filter(file => fs.lstatSync(path.resolve(file)).isDirectory());
}

module.exports = {
  config,
  listPackages,
  PACKAGES_DIR,
};
