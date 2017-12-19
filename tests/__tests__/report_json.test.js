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
