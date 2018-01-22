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

function findAssertionsForDoc(report, path) {
  for (const assertion of report.assertions) {
    if(assertion['earl:testSubject'].url === path) {
      return assertion.assertions;
    }
  }
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
  const assertions = findAssertionsForDoc(report, 'content_001.xhtml');
  expect(assertions).toBeDefined();
  expect(assertions).toEqual(expect.arrayContaining([
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
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#p1'] }),
      }),
    })
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#p2'] }),
      }),
    })
  ]));
});

test('Checks that `epub:type` have matching ARIA roles', async() => {
  const report = await ace('../data/axerule-matching-dpub-role');
  expect(report['earl:result']['earl:outcome']).toEqual('fail');
  const assertions = findAssertionsForDoc(report, 'content_001.xhtml');
  expect(assertions).toBeDefined();
  expect(assertions).toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({
        'dct:title': 'epub-type-has-matching-role',
        'dct:description': 'Ensure the element has an ARIA role matching its epub:type',
        'help': {
          'url': 'http://kb.daisy.org/publishing/docs/html/roles.html',
          'dct:title': 'ARIA role',
          'dct:description': 'ARIA role should be used in addition to epub:type'
        }
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#fail2'] }),
      }),
    }),
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass1'] }),
      }),
    })
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass2'] }),
      }),
    })
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass3'] }),
      }),
    })
  ]));
});
