'use strict';

const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

const runAce = require('../runAceJS');
import { findAssertionsForDoc } from "../utils";

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
    verbose: true,
    silent: true,
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
  // console.log(JSON.stringify(report, null, 4));
  expect(report['earl:result']['earl:outcome']).toEqual('fail');
  const assertions = findAssertionsForDoc(report, 'content_001.xhtml');
  expect(assertions).toBeDefined();
  expect(assertions).toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-deprecated-role', 'earl:impact': 'minor', }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#deprecated1'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-deprecated-role', 'earl:impact': 'minor', }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#deprecated2'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-deprecated-role', 'earl:impact': 'minor', }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#deprecated3'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-deprecated-role', 'earl:impact': 'minor', }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#deprecated4'] }),
      }),
    }),
  ]));
});
test('DPUB ARIA roles are allowed (with epub:type deprecated)', async () => {
  const report = await ace('../data/axerule-dpubroles-matching');
  // console.log(JSON.stringify(report, null, 4));
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('DPUB ARIA landmark unique', async () => {
  const report = await ace('../data/axerule-landmark-unique');
  expect(report['earl:result']['earl:outcome']).toEqual('fail');
  const assertions = findAssertionsForDoc(report, 'content_001.xhtml');
  expect(assertions).toBeDefined();
  expect(assertions).toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-allowed-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass-epi'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-allowed-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass-biblio'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-allowed-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#header-notes'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-allowed-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass-aside-endnotes1'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'aria-allowed-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass-aside-endnotes2'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'landmark-unique' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#header-notes', '#pass-aside-endnotes1', '#pass-aside-endnotes2'] }),
      }),
    }),
    // expect.objectContaining({
    //   'earl:test': expect.objectContaining({ 'dct:title': 'landmark-unique' }),
    //   'earl:result': expect.objectContaining({
    //     'earl:outcome': 'fail',
    //     'earl:pointer': expect.objectContaining({ css: ['#pass-aside-footnote1', '#pass-aside-footnote3'] }),
    //   }),
    // }),
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'landmark-unique' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass-aside-footnote2'] }),
      }),
    }),
  ]));
});

test('Ensure page breaks have labels', async () => {
  const report = await ace('../data/axerule-pagebreak-label');
  // console.log(JSON.stringify(report, null, 4));
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
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#p7'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#p8'] }),
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
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#p5'] }),
      }),
    })
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#p6'] }),
      }),
    })
  ]));
  // SEE: https://github.com/daisy/ace/issues/355
  // expect(assertions).not.toEqual(expect.arrayContaining([
  //   expect.objectContaining({
  //     'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
  //     'earl:result': expect.objectContaining({
  //       'earl:outcome': 'fail',
  //       'earl:pointer': expect.objectContaining({ css: ['#p7'] }),
  //     }),
  //   })
  // ]));
  // expect(assertions).not.toEqual(expect.arrayContaining([
  //   expect.objectContaining({
  //     'earl:test': expect.objectContaining({ 'dct:title': 'pagebreak-label' }),
  //     'earl:result': expect.objectContaining({
  //       'earl:outcome': 'fail',
  //       'earl:pointer': expect.objectContaining({ css: ['#p8'] }),
  //     }),
  //   })
  // ]));
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
        'earl:pointer': expect.objectContaining({ css: ['#fail1'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#fail2'] }),
      }),
    }),
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#fail3'] }),
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
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass4'] }),
      }),
    })
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass4a'] }),
      }),
    })
  ]));
  expect(assertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass5'] }),
      }),
    })
  ]));
  const navAssertions = findAssertionsForDoc(report, 'nav.xhtml');
  expect(navAssertions).toBeDefined();
  expect(navAssertions).toEqual([]);
  expect(navAssertions).not.toEqual(expect.arrayContaining([
    expect.objectContaining({
      'earl:test': expect.objectContaining({ 'dct:title': 'epub-type-has-matching-role' }),
      'earl:result': expect.objectContaining({
        'earl:outcome': 'fail',
        'earl:pointer': expect.objectContaining({ css: ['#pass1'] }),
      }),
    })
  ]));
});
test('Checks that `epub:type` `cover` isn’t reported has missing a matching ARIA role', async() => {
  const report = await ace('../data/axerule-matching-dpub-role-cover');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

test('Checks cover ARIA role with no alt', async() => {
  const report = await ace('../data/axerule-matching-dpub-role-cover-no-alt');
  // console.log(JSON.stringify(report, null, 4));
  expect(report['earl:result']['earl:outcome']).toEqual('fail');
});

test('Checks cover ARIA role with empty alt', async() => {
  const report = await ace('../data/axerule-matching-dpub-role-cover-empty-alt');
  // console.log(JSON.stringify(report, null, 4));
  expect(report['earl:result']['earl:outcome']).toEqual('fail');
});
