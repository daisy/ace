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
  return runAce(path.join(__dirname, epub), Object.assign({
    outdir: outdir.name,
    tmp: tmpdir.name,
  }, options))
    .then(() => {
      expect(fs.existsSync(reportPath)).toBeTruthy();
      return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    })
    .catch(err => console.log(err));
}

test('issue #49: multiple \'dc:title\' elements', async () => {
  const report = await ace('../data/issue-49');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('issue #53: this.json.data.images.forEach is not a function', async () => {
  const report = await ace('../data/issue-53');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('issue #57: Failed to execute \'matches\' on \'Element\': \'m:annotation-xml\'', async () => {
  const report = await ace('../data/issue-57');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});
