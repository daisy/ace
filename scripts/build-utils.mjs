'use strict';

import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;
export const PACKAGES_DIR = path.resolve(__dirname, '../packages');

export const config = {
  srcDir: 'src',
  buildDir: 'lib',
  jsPattern: '**/!(report-template-assets)/*.js',
  ignorePattern: '**/*.test.js',
};

export function listPackages() {
  return fs
    .readdirSync(PACKAGES_DIR)
    .map(file => path.resolve(PACKAGES_DIR, file))
    .filter(file => fs.lstatSync(path.resolve(file)).isDirectory());
}
