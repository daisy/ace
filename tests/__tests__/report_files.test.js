'use strict';

const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

const runAce = require('../runAceJS');

tmp.setGracefulCleanup();

let outdir;
let tmpdir;

const ace = function ace(epub, options = {}) {
  return runAce(epub, Object.assign({
    outdir: outdir.name,
    tmp: tmpdir.name,
    verbose: true,
    silent: true,
  }, options));
};

beforeEach(() => {
  outdir = tmp.dirSync({ prefix: 'ace_out_', unsafeCleanup: true });
  tmpdir = tmp.dirSync({ prefix: 'ace_tmp_', unsafeCleanup: true });
});

afterEach(() => {
  outdir.removeCallback();
  tmpdir.removeCallback();
});

test('unexisting EPUB fails with an error', () => {
  expect.assertions(1);
  return expect(ace('noepub'))
    .rejects.toMatch('');
});

test('packaged EPUB with absolute path', async () => {
  expect.assertions(1);
  await ace(path.join(__dirname, '../data/base-epub-30.epub'));
  expect(fs.existsSync(path.join(outdir.name, 'report.html'))).toBeTruthy();
});

test('packaged EPUB with relative path', async () => {
  expect.assertions(1);
  await ace('tests/data/base-epub-30.epub', { cwd: path.join(__dirname, '../..') });
  expect(fs.existsSync(path.join(outdir.name, 'report.html'))).toBeTruthy();
});

test('expanded EPUB with absolute path', async () => {
  expect.assertions(1);
  await ace(path.join(__dirname, '../data/base-epub-30'));
  expect(fs.existsSync(path.join(outdir.name, 'report.html'))).toBeTruthy();
});

test('expanded EPUB with relative path', async () => {
  expect.assertions(1);
  await ace('tests/data/base-epub-30', { cwd: path.join(__dirname, '../..') });
  expect(fs.existsSync(path.join(outdir.name, 'report.html'))).toBeTruthy();
});

test('files don’t leak outside the report dir', async () => {
  // Add another directory level to prevent any leak in the user's temp dir
  const outpath = path.join(outdir.name, 'report');
  fs.mkdirSync(outpath);
  expect.assertions(2);
  await ace(path.join(__dirname, '../data/fs-no-leaks'), { outdir: outpath });
  expect(fs.existsSync(path.join(outpath, 'report.html'))).toBeTruthy();
  expect(fs.existsSync(path.join(outpath, 'data/EPUB/images/img_001.jpg'))).toBeTruthy();
});

test('don’t crash when a resource isn’t in the EPUB', async () => {
  // Add another directory level to prevent any leak in the user's temp dir
  const outpath = path.join(outdir.name, 'report');
  fs.mkdirSync(outpath);
  expect.assertions(1);
  await ace(path.join(__dirname, '../data/fs-resource-missing'), { outdir: outpath });
  expect(fs.existsSync(path.join(outpath, 'report.html'))).toBeTruthy();
});
