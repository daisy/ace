'use strict';

const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

const ace = require('../../src/core/ace.js');

let outdir;
let tmpdir;

tmp.setGracefulCleanup();

beforeEach(() => {
  outdir = tmp.dirSync({ prefix: 'ace_out_', unsafeCleanup: true });
  tmpdir = tmp.dirSync({ prefix: 'ace_tmp_', unsafeCleanup: true });
});

afterEach(() => {
  outdir.removeCallback();
  tmpdir.removeCallback();
});

function runAce(epub) {
  return ace(epub, {
    cwd: process.cwd(),
    outdir: outdir.name,
    tmpdir: tmpdir.name,
    verbose: true,
    silent: true,
  });
}

test('unexisting EPUB fails with an error', () => {
  expect.assertions(1);
  return expect(runAce('noepub'))
    .rejects.toMatch('');
});

test('report dir is correctly created', async () => {
  expect.assertions(1);
  return runAce(path.join(__dirname, '../data/base-epub-30.epub')).then(() => {
    expect(fs.existsSync(path.join(outdir.name, 'report.html'))).toBeTruthy();
  });
});
