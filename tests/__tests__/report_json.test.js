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
    .catch(err => console.log(err));
}

test('report exists and is well-formed', async () => {
  const report = await ace(path.join(__dirname, '../data/base-epub-30'));
  expect(report.assertions).toBeDefined();
  expect(report.outlines).toBeDefined();
  expect(report.data).toBeDefined();
  expect(report.properties).toBeDefined();
  expect(report['earl:result']).toBeDefined();
});

describe('check assertions', () => {
  test('with no issues', async () => {
    const report = await ace(path.join(__dirname, '../data/base-epub-30'));
    expect(report['earl:result']).toBeDefined();
    expect(report['earl:result']).toEqual({ 'earl:outcome': 'pass' });
    expect(Array.isArray(report.assertions)).toBe(true);
    report.assertions.forEach(
      assertion => expect(assertion).toMatchObject({
        '@type': 'earl:assertion',
        assertions: [],
      }));
  });
  test('with violations', async () => {
    const report = await ace(path.join(__dirname, '../data/has-violations'));
    expect(report['earl:result']).toBeDefined();
    expect(report['earl:result']).toEqual({ 'earl:outcome': 'fail' });
    expect(Array.isArray(report.assertions)).toBe(true);
    report.assertions.forEach(
      (assertion) => {
        expect(assertion.assertions).toEqual(expect.arrayContaining([
          expect.objectContaining({
            'earl:result': expect.objectContaining({
              'earl:outcome': 'fail',
            }),
            'earl:test': expect.objectContaining({
              'earl:impact': expect.anything(),
              'dct:title': expect.anything(),
              'dct:description': expect.anything(),
              'help': {
                'url': expect.anything(),
                'dct:title': expect.anything(),
                'dct:description': expect.anything(),
              }
            })
          }),
        ]));
      });
  });
});

describe('check properties', () => {
  test('defaults', async () => {
    const report = await ace(path.join(__dirname, '../data/base-epub-30'));
    expect(report.properties).toMatchObject({
      hasBindings: false,
      hasManifestFallbacks: false,
      hasMathML: false,
      hasPageBreaks: false,
      hasFormElements: false,
      hasSVGContentDocuments: false,
    });
  });

  test('with bindings element', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-bindings'));
    expect(report.properties).toMatchObject({
      hasBindings: true,
    });
  });

  test('with form elements', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-forms'));
    expect(report.properties).toMatchObject({
      hasFormElements: true,
    });
  });

  test('with manifest fallbacks', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-manifest-fallbacks'));
    expect(report.properties).toMatchObject({
      hasManifestFallbacks: true,
    });
  });

  test('with mathml', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-mathml'));
    expect(report.properties).toMatchObject({
      hasMathML: true,
    });
  });

  test('with page breaks', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-pagebreaks'));
    expect(report.properties).toMatchObject({
      hasPageBreaks: true,
    });
  });

  test('with svg content docs', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-svg'));
    expect(report.properties).toMatchObject({
      hasSVGContentDocuments: true,
    });
  });
});

describe('check data', () => {
  test('nothing to extract', async () => {
    const report = await ace(path.join(__dirname, '../data/base-epub-30'));
    expect(report.data).toEqual({});
  });

  test('extract audios', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-audio'));
    expect(report.data).toMatchObject({
      audios: [{
        src: 'EPUB/audio_001.mp3',
      }],
    });
  });

  test('extract epub:switch elements', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-epub-switch'));
    expect(report.data).toMatchObject({
      'epub-switches': [{}],
    });
  });

  test('extract epub:trigger elements', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-epub-trigger'));
    expect(report.data).toMatchObject({
      'epub-triggers': [{}],
    });
  });

  test('extract images', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-image'));
    expect(report.data).toMatchObject({
      images: [{
        src: 'EPUB/image_001.jpg',
      }],
    });
  });

  test('extract SVG images', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-svg-image'));
    // console.log(JSON.stringify(report.data.images, null, 4));
    expect(report.data).toMatchObject({
      images: [{
        src: 'EPUB/image_001.jpg',
        alt: "title alt1",
        role: "presentation",
        html: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" role=\"presentation\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.1\" viewBox=\"0 0 1400 1600\" width=\"100%\">\n    <image height=\"1600\" width=\"1400\" xlink:href=\"./image_001.jpg\">\n        <title>\n            title    alt1  \n        </title>\n    </image>\n</svg>",
        location: "content_001.xhtml#epubcfi(/4/6)"
      },
      {
        src: 'EPUB/image_002.jpg',
        alt: "title alt2",
        role: null,
        html: "<vec:svg xmlns:vec=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" title=\"title alt2\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.1\" viewBox=\"0 0 1400 1600\" width=\"100%\">\n    <vec:image height=\"1600\" width=\"1400\" xlink:href=\"./image_002.jpg\"/>\n</vec:svg>",
        location: "content_001.xhtml#epubcfi(/4/8)"
      },
      {
        src: 'EPUB/image_003.jpg',
        role: "img",
        html: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" role=\"img\" aria-describedby=\"txt\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.1\" viewBox=\"0 0 1400 1600\" width=\"100%\"><image height=\"1600\" width=\"1400\" xlink:href=\"./image_003.jpg\"/></svg>",
        describedby: "this is text",
        location: "content_001.xhtml#epubcfi(/4/12)"
      }],
    });
  });

  test('extract links', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-links'));
    expect(report['earl:testSubject']).toMatchObject({
      links: {
        "a11y:certifierReport": "http://www.example.com/report.html"
      },
    });
  });

  test('extract videos', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-video'));
    expect(report.data).toMatchObject({
      videos: [{
        src: 'EPUB/video_001.mp4',
      }],
    });
  });

  test('extract videos with sources', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-video-sources'));
    expect(report.data).toMatchObject({
      videos: [{
        src: [{ src: 'EPUB/video_001.mp4' }, { src: 'EPUB/video_002.mp4' }],
      }],
    });
  });

  //FIXME extract switch
  //FIXME extract trigger
});
