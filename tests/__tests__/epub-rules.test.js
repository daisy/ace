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
    silent: true, // temporarily switch to false to see the log file path in the console
  }, options))
    .then(() => {
      expect(fs.existsSync(reportPath)).toBeTruthy();
      return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    })
    .catch(err => console.log(err));
}

// yarn build && yarn test -t "nothing to report"
test('nothing to report', async () => {
  const report = await ace('../data/base-epub-30');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

describe('page list and breaks', () => {
  test('page list correctly sourced', async () => {
    const report = await ace('../data/epubrules-pagelist');
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
  });
});

describe('accessibility metadata', () => {
  
  test('missing metadata is reported', async () => {
    const report = await ace('../data/epubrules-metadata');
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessibilitysummary',
        }),
      }),
    ]));
  });
  test('incorrect metadata value is reported', async () => {
    const report = await ace('../data/epubrules-metadata');
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessmode-invalid',
        }),
      }),
    ]));
    expect(assertions).not.toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessmodesufficient-invalid',
        }),
      }),
    ]));
  });
  test('`printPageNumbers` is declared as a feature but the Nav Doc has no page list', async () => {
    const report = await ace('../data/epubrules-metadata-printPageNumbers-nopagelist');
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessibilityFeature-printPageNumbers-nopagelist',
        }),
      }),
    ]));
  });
});
