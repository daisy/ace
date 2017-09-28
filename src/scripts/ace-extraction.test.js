/**
 * @jest-environment jsdom
 */
 /* eslint-env browser, jest */

'use strict';

require('./ace-extraction');

// Mock function defined in other modules
window.daisy.epub = {
  createCFI: jest.fn(),
};
const mockH5O = jest.fn();
mockH5O.mockReturnValue({
  asHTML: jest.fn(),
});
window.HTML5Outline = mockH5O;

const ace = window.daisy.ace;
const epub = window.daisy.epub;

beforeEach(() => {
  epub.createCFI.mockReturnValue('42');
});
afterEach(() => {
  epub.createCFI.mockClear();
});

test('createReport', () => {
  const report = {};
  ace.createReport(report);
  expect(report.outlines).toBeDefined();
  expect(report.data).toBeDefined();
  expect(report.data).toEqual({});
  expect(report.properties).toBeDefined();
  expect(report.properties.hasMathML).toBeDefined();
  expect(report.properties.hasPageBreaks).toBeDefined();
});

describe('extracting audio', () => {
  test('simple audio', () => {
    const html = `
    <audio src="foo.mp3" id="foo" controls=""></audio>`;
    document.body.innerHTML = html;
    const results = ace.getAudios();
    expect(results.length).toBe(1);
    expect(results[0].html).toBe(html.trim());
    expect(results[0].id).toBe('foo');
    expect(results[0].controls).toBeTruthy();
    expect(results[0].tracks).toEqual([]);
  });

  test('audio with no id', () => {
    document.body.innerHTML = `
    <audio src="foo.mp3"/>`;
    const results = ace.getAudios();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('audio with no controls', () => {
    document.body.innerHTML = `
    <audio src="foo.webm"/>`;
    const results = ace.getAudios();
    expect(results.length).toBe(1);
    expect(results[0].controls).toBe(false);
  });

  test('audio with sources', () => {
    document.body.innerHTML = `
    <audio>
      <source src="audio.wav" type="audio/wav"/>
    </audio>`;
    const results = ace.getAudios();
    expect(results.length).toBe(1);
    expect(results[0].src).toBeDefined();
    expect(Array.isArray(results[0].src)).toBeTruthy();
    expect(results[0].src.length).toBe(1);
    expect(results[0].src[0]).toEqual({
      src: 'audio.wav',
      type: 'audio/wav',
    });
  });

  test('audio with tracks', () => {
    document.body.innerHTML = `
    <audio src="foo.mp3">
      <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English">
      <track kind="subtitles" src="foo.fr.vtt" srclang="fr" label="Français">
    </audio>`;
    const results = ace.getAudios();
    expect(results.length).toBe(1);
    expect(results[0].tracks).toBeDefined();
    expect(results[0].tracks.length).toBe(2);
    expect(results[0].tracks[0]).toEqual({
      kind: 'subtitles',
      label: 'English',
      src: 'foo.en.vtt',
      srclang: 'en',
    });
  });
});

describe('extracting canvases', () => {
  test('simple canva', () => {
    document.body.innerHTML = `
    <canvas id="foo"></canvas>
    `;
    const results = ace.getCanvases();
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].id).toEqual('foo');
  });

  test('canvas with no id', () => {
    document.body.innerHTML = `
    <canvas></canvas>`;
    const results = ace.getCanvases();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });
});

describe('extracting embeds', () => {
  test('simple embed', () => {
    document.body.innerHTML = `
    <embed type="video/quicktime" src="movie.mov" id="foo"></embed>
    `;
    const results = ace.getEmbeds();
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].src).toEqual('movie.mov');
    expect(results[0].id).toEqual('foo');
  });

  test('embed with no id', () => {
    document.body.innerHTML = `
    <embed src="movie.mov"/>`;
    const results = ace.getEmbeds();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('embed with no src', () => {
    document.body.innerHTML = `
    <embed/>`;
    const results = ace.getEmbeds();
    expect(results.length).toBe(1);
    expect(results[0].src).toBeUndefined();
  });

  test('embed with no type', () => {
    document.body.innerHTML = `
    <embed src="movie.mov"/>`;
    const results = ace.getEmbeds();
    expect(results.length).toBe(1);
    expect(results[0].type).toBeUndefined();
  });
});

describe('extracting headings', () => {
  test('simple h1', () => {
    document.body.innerHTML = `
    <h1>title 1</h1>
    `;
    const results = ace.getHeadings();
    expect(results.length).toBe(1);
    expect(results[0].html).toBe('title 1');
    expect(results[0].level).toBe(1);
  });
});

describe('extracting iframes', () => {
  test('simple iframe', () => {
    document.body.innerHTML = `
    <iframe src="test.html" id="foo"></iframe>
    `;
    const results = ace.getIframes();
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].src).toEqual('test.html');
    expect(results[0].id).toEqual('foo');
  });

  test('iframe with no id', () => {
    document.body.innerHTML = `
    <iframe src="test.html"/>`;
    const results = ace.getIframes();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });
});

describe('extracting maps', () => {
  test('simple map', () => {
    document.body.innerHTML = `
    <map name="bar" id="foo"></map>
    `;
    const results = ace.getMaps();
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].name).toEqual('bar');
    expect(results[0].id).toEqual('foo');
  });

  test('map with no id', () => {
    document.body.innerHTML = `
    <map name="foo"/>`;
    const results = ace.getMaps();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });
});

describe('extracting objects', () => {
  test('simple object', () => {
    document.body.innerHTML = `
    <object data="movie.swf" type="application/x-shockwave-flash" id="foo"></object>
    `;
    const results = ace.getObjects();
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].data).toEqual('movie.swf');
    expect(results[0].id).toEqual('foo');
    expect(results[0].type).toEqual('application/x-shockwave-flash');
  });

  test('object with no id', () => {
    document.body.innerHTML = `
    <object data="movie.swf"/>`;
    const results = ace.getObjects();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('object with no data`', () => {
    document.body.innerHTML = `
    <object id="foo"/>`;
    const results = ace.getObjects();
    expect(results.length).toBe(1);
    expect(results[0].data).toBeUndefined();
  });

  test('object with no type', () => {
    document.body.innerHTML = `
    <object data="movie.swf"/>`;
    const results = ace.getObjects();
    expect(results.length).toBe(1);
    expect(results[0].type).toBeUndefined();
  });
});

describe('extracting scripts', () => {
  test('simple script', () => {
    document.body.innerHTML = `
    <script src="script.js" id="foo"></script>
    `;
    const results = ace.getScripts();
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].src).toEqual('script.js');
    expect(results[0].id).toEqual('foo');
    expect(results[0].type).toEqual('text/javascript');
  });

  test('script with no id', () => {
    document.body.innerHTML = `
    <script src="script.js"/>`;
    const results = ace.getScripts();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('script with no src', () => {
    document.body.innerHTML = `
    <script/>`;
    const results = ace.getScripts();
    expect(results.length).toBe(1);
    expect(results[0].src).toBeUndefined();
  });

  test('script with explicit type', () => {
    document.body.innerHTML = `
    <script type="application/ld+json"/>`;
    const results = ace.getScripts();
    expect(results.length).toBe(1);
    expect(results[0].type).toEqual('application/ld+json');
  });
});

describe('extracting video', () => {
  test('simple video', () => {
    const html = `
    <video src="foo.webm" id="foo" controls=""></video>`;
    document.body.innerHTML = html;
    const results = ace.getVideos();
    expect(results.length).toBe(1);
    expect(results[0].html).toBe(html.trim());
    expect(results[0].controls).toBeTruthy();
    expect(results[0].src).toEqual('foo.webm');
    expect(results[0].id).toEqual('foo');
    expect(results[0].tracks).toEqual([]);
  });

  test('video with no id', () => {
    document.body.innerHTML = `
    <video src="foo.webm"/>`;
    const results = ace.getVideos();
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('video with no controls', () => {
    document.body.innerHTML = `
    <video src="foo.webm"/>`;
    const results = ace.getVideos();
    expect(results.length).toBe(1);
    expect(results[0].controls).toBe(false);
  });

  test('video with tracks', () => {
    document.body.innerHTML = `
    <video src="foo.webm">
      <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English">
      <track kind="subtitles" src="foo.fr.vtt" srclang="fr" label="Français">
    </video>`;
    const results = ace.getVideos();
    expect(results.length).toBe(1);
    expect(results[0].tracks).toBeDefined();
    expect(results[0].tracks.length).toEqual(2);
    expect(results[0].tracks[0]).toEqual({
      kind: 'subtitles',
      label: 'English',
      src: 'foo.en.vtt',
      srclang: 'en',
    });
  });

  test('video with sources', () => {
    document.body.innerHTML = `
    <video>
      <source src="video.webm" type="video/webm"/>
      <source src="video.mp4" type="video/mp4"/>
    </video>`;
    const results = ace.getVideos();
    expect(results.length).toBe(1);
    expect(results[0].src).toBeDefined();
    expect(Array.isArray(results[0].src)).toBeTruthy();
    expect(results[0].src.length).toBe(2);
    expect(results[0].src[0]).toEqual({
      src: 'video.webm',
      type: 'video/webm',
    });
  });
});

describe('finding mathml', () => {
  test('no math', () => {
    document.body.innerHTML = `
    <p>foo</p>`;
    expect(ace.hasMathML()).toBe(false);
  });

  test('with math', () => {
    document.body.innerHTML = `
    <math><mi>x</mi></math>`;
    expect(ace.hasMathML()).toBe(true);
  });
});

describe('finding pagebreaks', () => {
  test('no breaks', () => {
    document.body.innerHTML = `
    <p>foo</p>`;
    expect(ace.hasPageBreaks()).toBe(false);
  });

  test('epub:type break', () => {
    document.body.innerHTML = `
    <span epub:type="pagebreak">`;
    expect(ace.hasPageBreaks()).toBe(true);
  });

  test('ARIA role break', () => {
    document.body.innerHTML = `
    <span role="doc-pagebreak">`;
    expect(ace.hasPageBreaks()).toBe(true);
  });

  test('pagebreak role among other values', () => {
    document.body.innerHTML = `
    <span role="foo doc-pagebreak bar">`;
    expect(ace.hasPageBreaks()).toBe(true);
  });
});
