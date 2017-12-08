/**
 * Watch files for changes and rebuild (copy from 'src/' to `lib/`) if changed
 *
 * Inspired from Jest’s build scripts:
 * https://github.com/facebook/jest/tree/master/scripts
 */

'use strict';

const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { listPackages } = require('./build-utils');

const BUILD_CMD = `node ${path.resolve(__dirname, './build.js')}`;

let filesToBuild = new Map();

const exists = (filename) => {
  try {
    return fs.statSync(filename).isFile();
  } catch (e) {
    // ignore
  }
  return false;
};
const rebuild = filename => filesToBuild.set(filename, true);

listPackages().forEach((pkg) => {
  const srcDir = path.resolve(pkg, 'src');
  try {
    fs.accessSync(srcDir, fs.F_OK);
    fs.watch(path.resolve(pkg, 'src'), { recursive: true }, (event, filename) => {
      const filePath = path.resolve(srcDir, filename);

      if ((event === 'change' || event === 'rename') && exists(filePath)) {
        console.log(chalk.green('->'), `${event}: ${filename}`);
        rebuild(filePath);
      } else {
        const buildFile = path.resolve(srcDir, '..', 'build', filename);
        try {
          fs.unlinkSync(buildFile);
          process.stdout.write(
            chalk.red('  \u2022 ') +
            path.relative(path.resolve(srcDir, '..', '..'), buildFile) +
            chalk.red(' (deleted)') +
            '\n');
        } catch (e) {
          // ignore
        }
      }
    });
  } catch (e) {
    // doesn't exist
  }
});

setInterval(() => {
  const files = Array.from(filesToBuild.keys());
  if (files.length) {
    filesToBuild = new Map();
    try {
      execSync(`${BUILD_CMD} ${files.join(' ')}`, { stdio: [0, 1, 2] });
    } catch (e) {
      // ignore
    }
  }
}, 100);

console.log(chalk.red('->'), chalk.cyan('Watching for changes...'));
