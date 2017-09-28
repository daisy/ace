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
    expect(report.assertions).toMatchObject([{
      '@type': 'earl:assertion',
      assertions: [],
    }]);
  });
});

describe('check properties', () => {
  test('without mathml', async () => {
    const report = await ace(path.join(__dirname, '../data/base-epub-30'));
    expect(report.properties).toMatchObject({
      hasMathML: false,
    });
  });

  test('with mathml', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-mathml'));
    expect(report.properties).toMatchObject({
      hasMathML: true,
    });
  });

  test('without page breaks', async () => {
    const report = await ace(path.join(__dirname, '../data/base-epub-30'));
    expect(report.properties).toMatchObject({
      hasPageBreaks: false,
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

  test('extract images', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-image'));
    expect(report.data).toMatchObject({
      images: [{
        src: 'EPUB/image_001.jpg',
      }],
    });
  });

  test('extract audios', async () => {
    const report = await ace(path.join(__dirname, '../data/feat-audio'));
    expect(report.data).toMatchObject({
      audios: [{
        src: 'EPUB/audio_001.mp3',
      }],
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
});
