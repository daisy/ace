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

test('issue #85: failed to detect page markers from `epub:type`', async () => {
  const report = await ace('../data/issue-85');
  expect(report.properties.hasPageBreaks).toBe(true);
});

test('issue #108: HTML5Outline is not defined (RequireJS conflict)', async () => {
  const report = await ace('../data/issue-108');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('issue #114: Description list item does not have a <dl> parent element', async () => {
  const report = await ace('../data/issue-114');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('issue #122: Failed to check HTML content with `.xml` extension', async () => {
  const report = await ace('../data/issue-122');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('issue #170: heading with `doc-subtitle` role were reported empty', async () => {
  const report = await ace('../data/issue-170');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('issue #182: named character references are parsed', async () => {
  const report = await ace('../data/issue-182');
  expect(report.assertions).toEqual(expect.arrayContaining([
    expect.objectContaining({
      "earl:testSubject": {
        "url": "content_001.xhtml",
        "dct:title": "Minimal – EPUB"
      }
    })
  ]));
});
