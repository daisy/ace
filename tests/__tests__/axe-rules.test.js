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

test('`bypass` rule is disabled', async () => {
  const report = await ace('../data/axerule-bypass');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('DPUB ARIA roles are allowed', async () => {
  const report = await ace('../data/axerule-dpubroles');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('Ensure page breaks have labels', async () => {
  const report = await ace('../data/axerule-pagebreak-label');
  expect(report['earl:result']['earl:outcome']).toEqual('fail');
  expect(report.assertions).toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:testSubject': expect.objectContaining({ url: 'content_001.xhtml' }),
      assertions: [
        expect.objectContaining({
          'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
          'earl:result': expect.objectContaining({
            'earl:outcome': 'fail',
            'earl:pointer': expect.objectContaining({ css: ['#p3'] }),
          }),
        }),
        expect.objectContaining({
          'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
          'earl:result': expect.objectContaining({
            'earl:outcome': 'fail',
            'earl:pointer': expect.objectContaining({ css: ['#p4'] }),
          }),
        }),
      ],
    })]));
});
