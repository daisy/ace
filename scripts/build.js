/**
 * Script to build node packages.
 * - transpiles all the JS files into the `lib` directory
 * - non-JS files are copied as-is
 *
 * Inspired from Jest’s build scripts:
 * https://github.com/facebook/jest/tree/master/scripts
 */

'use strict';

const babel = require('babel-core');
const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const micromatch = require('micromatch');
const mkdirp = require('mkdirp');
const path = require('path');
const spawn = require('cross-spawn');


const { config, listPackages, PACKAGES_DIR } = require('./build-utils');

const babelConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '..', '.babelrc'), 'utf8'));

function getBuildPath(file) {
  const pkgName = path.relative(PACKAGES_DIR, file).split(path.sep)[0];
  const pkgSrcDir = path.resolve(PACKAGES_DIR, pkgName, config.srcDir);
  const pkgBuildDir = path.resolve(PACKAGES_DIR, pkgName, config.buildDir);
  const relativePath = path.relative(pkgSrcDir, file);
  return path.resolve(pkgBuildDir, relativePath);
}

function buildFile(file, silent) {
  const destPath = getBuildPath(file);

  mkdirp.sync(path.dirname(destPath));
  if (micromatch.isMatch(file, config.ignorePattern)) {
    silent || process.stdout.write(
        chalk.dim('    • ') +
        path.relative(PACKAGES_DIR, file) +
        chalk.dim(' (ignore)') +
        '\n');
  } else if (!micromatch.isMatch(file, config.jsPattern)) {
    fs.createReadStream(file).pipe(fs.createWriteStream(destPath));
    silent || process.stdout.write(
      chalk.yellow('    • ') +
        path.relative(PACKAGES_DIR, file) +
        chalk.yellow(' ⇒ ') +
        path.relative(PACKAGES_DIR, destPath) +
        chalk.yellow(' (copy)') +
        '\n');
  } else {
    const options = Object.assign({}, babelConfig);
    const transformed = babel.transformFileSync(file, options).code;
    fs.writeFileSync(destPath, transformed);
    silent ||
      process.stdout.write(
        chalk.green('    • ') +
          path.relative(PACKAGES_DIR, file) +
          chalk.green(' ⇒ ') +
          path.relative(PACKAGES_DIR, destPath) +
          chalk.yellow(' (babel)') +
          '\n');
  }
}

function buildPackage(pkg) {
  const srcDir = path.resolve(pkg, config.srcDir);
  const pattern = path.resolve(srcDir, '**/*');
  const files = glob.sync(pattern, {
    nodir: true,
  });

  const verbose = process.env.VERBOSE;

  process.stdout.write(`  ${path.basename(pkg)}  ${chalk.dim('...')}${verbose ? '\n' : ''}`);

  files.forEach(file => buildFile(file, !verbose));

  const buildScript = path.resolve(pkg, 'scripts/build.js');
  if (fs.existsSync(buildScript)) {
    spawn.sync('node', [buildScript], { stdio: 'inherit' });
  }
  process.stdout.write(`${chalk.reset.bold.green('  ✓ Done')}\n`);
}

const files = process.argv.slice(2);

if (files.length) {
  files.forEach(buildFile);
} else {
  const packages = listPackages();
  process.stdout.write(chalk.inverse('Building packages\n'));
  packages.forEach(buildPackage);
}
