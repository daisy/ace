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

// yarn build && yarn test -t "nothing to report"
test('nothing to report', async () => {
  const report = await ace('../data/base-epub-30');
  expect(report['earl:result']['earl:outcome']).toEqual('pass');
});

describe('page list and TOC reading order', () => {
  test('TOC correctly ordered PASS but missing page list for page breaks', async () => {
    const report = await ace('../data/epubrules-pagelist-missing-pagebreak');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, '/EPUB/nav.xhtml');
    // console.log(JSON.stringify(assertions, null, 4));
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-pagelist-missing-pagebreak',
        }),
      }),
    ]));
  });
  test('page list and TOC correctly ordered PASS, but SMIL missing pagebreak epub:type', async () => {
    const report = await ace('../data/epubrules-pagelist-smil-pagebreak');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions1 = findAssertionsForDoc(report, 'content_001.smil');
    // console.log(JSON.stringify(assertions1, null, 4));
    expect(assertions1).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-pagelist-mediaoverlays',
        }),
      }),
    ]));
    const assertions2 = findAssertionsForDoc(report, 'content_002.smil');
    // console.log(JSON.stringify(assertions2, null, 4));
    expect(assertions2).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-pagelist-mediaoverlays',
        }),
      }),
    ]));
  });
  test('page list and TOC correctly ordered PASS', async () => {
    const report = await ace('../data/epubrules-pagelist-toc-order-pass');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
  });
  test('page list and TOC correctly ordered PASS FXL', async () => {
    const report = await ace('../data/epubrules-pagelist-toc-order-pass-FXL');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
  });
  test('page list and TOC correctly ordered FAIL, with missing pagebreak references', async () => {
    const report = await ace('../data/epubrules-pagelist-toc-order-fail');
    // console.log(JSON.stringify(report, null, 4));
    const assertions = findAssertionsForDoc(report, '/EPUB/nav.xhtml');
    // console.log(JSON.stringify(assertions, null, 4));
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-pagelist-order',
        }),
      }),
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-pagelist-missing-pagebreak',
        }),
      }),
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-toc-order',
        }),
      }),
    ]));
    const assertions2 = findAssertionsForDoc(report, 'nav.xhtml');
    // console.log(JSON.stringify(assertions2, null, 4));
    expect(assertions2).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-type-has-matching-role',
        }),
      }),
    ]));
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
  });
});

describe('page list and breaks', () => {
  test('page list correctly sourced', async () => {
    const report = await ace('../data/epubrules-pagelist');
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
  });
});

describe('page list and breaks FXL', () => {
  test('page list correctly sourced FXL', async () => {
    const report = await ace('../data/epubrules-pagelist-FXL');
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
  });
});

describe('package lang', () => {
  test('xml:lang is present in OPF', async () => {
    const report = await ace('../data/epubrules-package-lang');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'epub-lang',
        }),
      }),
    ]));
  });
});

describe('accessibility metadata', () => {

  test('accessibilityAPI and accessibilityControl metadata are ignored when present', async () => {
    const report = await ace('../data/epubrules-metadata-accessibilityAPI_Control-present');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
    expect(report['a11y-metadata']['missing']).toEqual([
      "a11y:certifiedBy",
      "a11y:certifierCredential",
      "a11y:certifierReport"
    ]);
    expect(report['a11y-metadata']['present']).toEqual([
      "schema:accessMode",
      "schema:accessibilityFeature",
      "schema:accessibilityHazard",
      "schema:accessibilitySummary",
      "schema:accessModeSufficient",
      "schema:accessibilityAPI",
      "schema:accessibilityControl",
      "dcterms:conformsTo"
    ]);
    expect(report['earl:testSubject']['metadata']).toEqual({
      "dc:title": "Minimal EPUB 3.0",
      "dc:language": "en",
      "dc:identifier": "NOID",
      "dcterms:modified": "2017-01-01T00:00:01Z",
      "schema:accessMode": "textual",
      "schema:accessibilityFeature": ["structuralNavigation", "ARIA"],
      "schema:accessibilityHazard": "noFlashingHazard",
      "schema:accessibilitySummary": "everything OK!",
      "schema:accessModeSufficient": "visual,textual",
      "schema:accessibilityControl": "fullKeyboardControl",
      "schema:accessibilityAPI": "AndroidAcessibility",
      "dcterms:conformsTo": "EPUB-A11Y-11_WCAG-21-AA"
    });
    expect(report['earl:testSubject']['links']).toEqual({});
  });
  test('accessibilityAPI and accessibilityControl metadata are ignored when missing', async () => {
    const report = await ace('../data/epubrules-metadata-accessibilityAPI_Control-missing');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
    expect(report['a11y-metadata']['missing']).toEqual([]);
    expect(report['a11y-metadata']['present']).toEqual([
      "schema:accessMode",
      "schema:accessibilityFeature",
      "schema:accessibilityHazard",
      "schema:accessibilitySummary",
      "schema:accessModeSufficient",
      "a11y:certifiedBy",
      "a11y:certifierCredential",
      "a11y:certifierReport",
      "dcterms:conformsTo"
    ]);
    expect(report['earl:testSubject']['metadata']).toEqual({
      "dc:title": "Minimal EPUB 3.0",
      "dc:language": "en",
      "dc:identifier": "NOID",
      "dcterms:modified": "2017-01-01T00:00:01Z",
      "schema:accessMode": "textual",
      "schema:accessibilityFeature": "ARIA",
      "schema:accessibilityHazard": "noFlashingHazard",
      "schema:accessibilitySummary": "everything OK!",
      "schema:accessModeSufficient": "visual,textual",
      "a11y:certifiedBy": "CERTBY",
      "a11y:certifierCredential": "CERTCRED",
      "dcterms:conformsTo": [
          "EPUB-A11Y-11_WCAG-21-A",
          "EPUB-A11Y-11_WCAG-20-AA"
      ]
    });
    expect(report['earl:testSubject']['links']).toEqual({
      "a11y:certifierReport": "http://www.example.com/report.html",
      "dcterms:conformsTo": [
          "http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa",
          "http://other.com/dummy"
      ]
    });
  });

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
  });
  test('accessmode and accessibilitysummary metadata are incorrect', async () => {
    const report = await ace('../data/epubrules-metadata');
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessmode-invalid',
        }),
      }),
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessibilitysummary',
        }),
      }),
    ]));
  });
  test('accessModeSufficient metadata is missing', async () => {
    const report = await ace('../data/epubrules-metadata-accessModeSufficient-missing');
    // console.log(JSON.stringify(report, null, 4));
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessmodesufficient',
        }),
      }),
    ]));
  });
  test('accessModeSufficient metadata is valid', async () => {
    const report = await ace('../data/epubrules-metadata-accessModeSufficient-valid');
    expect(report['earl:result']['earl:outcome']).toEqual('pass');
    // const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    // expect(assertions).not.toEqual(expect.arrayContaining([
    //   expect.objectContaining({
    //     'earl:test': expect.objectContaining({
    //       'dct:title': 'metadata-accessmodesufficient-invalid',
    //     }),
    //   }),
    // ]));
  });
  test('accessModeSufficient metadata invalid separator', async () => {
    const report = await ace('../data/epubrules-metadata-accessModeSufficient-invalid-separator');
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessmodesufficient-invalid',
        }),
      }),
    ]));
  });
  test('accessModeSufficient metadata invalid item', async () => {
    const report = await ace('../data/epubrules-metadata-accessModeSufficient-invalid-item');
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessmodesufficient-invalid',
        }),
      }),
    ]));
  });
  test('accessibilityFeature case-sensitivity', async () => {
    const report = await ace('../data/epubrules-metadata-accessibilityFeature-case-sensitive');
    expect(report['earl:result']['earl:outcome']).toEqual('fail');
    const assertions = findAssertionsForDoc(report, 'EPUB/package.opf');
    expect(assertions).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'earl:test': expect.objectContaining({
          'dct:title': 'metadata-accessibilityfeature-invalid',
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
