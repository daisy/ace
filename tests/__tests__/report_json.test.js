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
  reportPath = path.join(outdir.name, 'ace.json');
});

afterEach(() => {
  outdir.removeCallback();
  tmpdir.removeCallback();
});


function ace(epub, options = {}) {
  return runAce(epub, Object.assign({
    outdir: outdir.name,
    tmp: tmpdir.name,
  }, options))
    .then(() => {
      expect(fs.existsSync(reportPath)).toBeTruthy();
      return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    })
    .catch(err => console.log(err));
}

test('report exists and is well-formed', async () => {
  const report = await ace(path.join(__dirname, '../data/base-epub-30'));
  expect(report.outlines).toBeDefined();
  expect(report.assertions).toBeDefined();
  expect(report.data).toBeDefined();
  expect(report['earl:result']).toBeDefined();
});

test('with no issues', async () => {
  const report = await ace(path.join(__dirname, '../data/base-epub-30'));
  expect(report['earl:result']).toBeDefined();
  expect(report['earl:result']).toEqual({ 'earl:outcome': 'pass' });
  expect(report.assertions).toMatchObject([{
    '@type': 'earl:assertion',
    assertions: [],
  }]);
});
