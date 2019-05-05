'use strict';

const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

const runAce = require('../runAceJS');

tmp.setGracefulCleanup();

let outdir;
let tmpdir;
let reportPath;

beforeEach(() => {
  outdir = tmp.dirSync({ prefix: 'ace_out_', unsafeCleanup: true });
  tmpdir = tmp.dirSync({ prefix: 'ace_tmp_', unsafeCleanup: true });
  reportPath = path.join(outdir.name, 'report.json');
});

afterEach(() => {
  outdir.removeCallback();
  tmpdir.removeCallback();
});


function ace(epub, options = {}) {
  return runAce(epub, Object.assign({
    outdir: outdir.name,
    tmp: tmpdir.name,
    verbose: true,
    silent: true,
  }, options))
    .then(() => {
      expect(fs.existsSync(reportPath)).toBeTruthy();
      return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    })
    .catch((err) => {
      // console.log(err);
    });
}

test('well-formed EPUB archive is processed', async () => {
  const report = await ace(path.join(__dirname, '../data/base-epub-30.epub'));
  expect(report['earl:result']).toBeDefined();
});

test('an EPUB archive with an extra comment length is repaired', async () => {
const report = await ace(path.join(__dirname, '../data/zip-invalid-comment-length.epub'));
expect(report['earl:result']).toBeDefined();
});

test('an EPUB archive beyond repair is rejected', async () => {
  const report = await ace(path.join(__dirname, '../data/zip-invalid.epub'));
  expect(report).toBeUndefined();
});