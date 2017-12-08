'use strict';

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');

function listPackages() {
  return fs
    .readdirSync(PACKAGES_DIR)
    .map(file => path.resolve(PACKAGES_DIR, file))
    .filter(file => fs.lstatSync(path.resolve(file)).isDirectory());
}

module.exports = {
  listPackages,
  PACKAGES_DIR,
};
