/**
 * @jest-environment @daisy/jest-env-puppeteer
 */
 /* eslint-env browser, jest */

'use strict';

const $ = require('@daisy/jest-puppeteer');

beforeAll(async () => {
  await $.loadXHTMLPage();
  await $.injectScripts([require.resolve('./ace-extraction.js')]);
  await $.injectJestMock();
  await global.page.evaluate(() => {
    const mockH5O = window.mock.fn();
    mockH5O.mockReturnValue({
      asHTML: window.mock.fn(),
    });
    window.HTML5Outline = mockH5O;
    window.daisy.epub = {
      createCFI: window.mock.fn(),
    };
    window.daisy.epub.createCFI.mockReturnValue('42');
  });
});

afterAll(async () => {
  await $.closePage();
});

async function run(name, markup) {
  return global.page.evaluate(($name, $markup) => {
    document.body.innerHTML = $markup;
    return window.ace[$name]();
  }, name, markup);
}

test('createReport', async () => {
  const report = await global.page.evaluate(() => {
    const ret = {};
    window.ace.createReport(ret);
    return ret;
  });
  expect(report.outlines).toBeDefined();
  expect(report.data).toBeDefined();
  expect(report.data).toEqual({});
  expect(report.properties).toBeDefined();
  expect(report.properties.hasMathML).toBeDefined();
  expect(report.properties.hasPageBreaks).toBeDefined();
});

describe('extracting audio', () => {
  test('simple audio', async () => {
    const results = await run('getAudios', '<audio src="foo.mp3" id="foo" controls=""></audio>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeDefined();
    expect(results[0].id).toBe('foo');
    expect(results[0].controls).toBeTruthy();
    expect(results[0].tracks).toEqual([]);
  });

  test('audio with no id', async () => {
    const results = await run('getAudios', '<audio src="foo.mp3"/>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('audio with no controls', async () => {
    const results = await run('getAudios', '<audio src="foo.webm"/>');
    expect(results.length).toBe(1);
    expect(results[0].controls).toBe(false);
  });

  test('audio with sources', async () => {
    const results = await run('getAudios', `
    <audio>
      <source src="audio.wav" type="audio/wav"/>
    </audio>`);
    expect(results.length).toBe(1);
    expect(results[0].src).toBeDefined();
    expect(Array.isArray(results[0].src)).toBeTruthy();
    expect(results[0].src.length).toBe(1);
    expect(results[0].src[0]).toEqual({
      src: 'audio.wav',
      type: 'audio/wav',
    });
  });

  test('audio with tracks', async () => {
    const results = await run('getAudios', `
    <audio src="foo.mp3">
      <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"/>
      <track kind="subtitles" src="foo.fr.vtt" srclang="fr" label="Français"/>
    </audio>`);
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
  test('simple canva', async () => {
    const results = await run('getCanvases', '<canvas id="foo"></canvas>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].id).toEqual('foo');
  });

  test('canvas with no id', async () => {
    const results = await run('getCanvases', '<canvas></canvas>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });
});

describe('extracting embeds', () => {
  test('simple embed', async () => {
    const results = await run('getEmbeds', '<embed type="video/quicktime" src="movie.mov" id="foo"></embed>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].src).toEqual('movie.mov');
    expect(results[0].id).toEqual('foo');
  });

  test('embed with no id', async () => {
    const results = await run('getEmbeds', '<embed src="movie.mov"/>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('embed with no src', async () => {
    const results = await run('getEmbeds', '<embed/>');
    expect(results.length).toBe(1);
    expect(results[0].src).toBeUndefined();
  });

  test('embed with no type', async () => {
    const results = await run('getEmbeds', '<embed src="movie.mov"/>');
    expect(results.length).toBe(1);
    expect(results[0].type).toBeUndefined();
  });
});

describe('extracting epub:switch', () => {
  test('switch with id', async () => {
    const results = await run('getEPUBSwitches', '<epub:switch id="foo" />');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].id).toEqual('foo');
  });

  test('embed with no id', async () => {
    const results = await run('getEPUBSwitches', '<epub:switch />');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('switch in other namespace', async () => {
    const results = await run('getEPUBSwitches', '<ex:switch id="foo" xmlns:ex="https://example.com"/>');
    expect(results.length).toBe(0);
  });
});

describe('extracting epub:trigger', () => {
  test('trigger with id', async () => {
    const results = await run('getEPUBTriggers', '<epub:trigger id="foo" />');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].id).toEqual('foo');
  });

  test('embed with no id', async () => {
    const results = await run('getEPUBTriggers', '<epub:trigger />');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('trigger in other namespace', async () => {
    const results = await run('getEPUBTriggers', '<ex:trigger id="foo" xmlns:ex="https://example.com"/>');
    expect(results.length).toBe(0);
  });
});

describe('extracting headings', () => {
  test('simple h1', async () => {
    const results = await run('getHeadings', '<h1>title 1</h1>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBe('title 1');
    expect(results[0].level).toBe(1);
  });

  test('complex h1', async () => {
    const results = await run('getHeadings', '<h1>title 1 <a href="#foo">link</a></h1>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBe('title 1 link');
    expect(results[0].level).toBe(1);
  });

  test('role=heading with aria-level', async () => {
    const results = await run('getHeadings', '<div role="heading" aria-level="1">title 1</div>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBe('title 1');
    expect(results[0].level).toBe(1);
  });

  test('role=heading without aria-level', async () => {
    const results = await run('getHeadings', '<div role="heading">title 1</div>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBe('title 1');
    expect(results[0].level).toBe(2);
  });

  test('role=heading with negative aria-level', async () => {
    const results = await run('getHeadings', '<div role="heading" aria-level="-1">title 1</div>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBe('title 1');
    expect(results[0].level).toBe(2);
  });

  test('role=heading with infinite aria-level', async () => {
    const results = await run('getHeadings', '<div role="heading" aria-level="Infinity">title 1</div>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBe('title 1');
    expect(results[0].level).toBe(2);
  });
});

describe('extracting iframes', () => {
  test('simple iframe', async () => {
    const results = await run('getIframes', '<iframe src="test.html" id="foo"></iframe>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].src).toEqual('test.html');
    expect(results[0].id).toEqual('foo');
  });

  test('iframe with no id', async () => {
    const results = await run('getIframes', '<iframe src="test.html"/>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });
});

describe('extracting maps', () => {
  test('simple map', async () => {
    const results = await run('getMaps', '<map name="bar" id="foo"></map>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].name).toEqual('bar');
    expect(results[0].id).toEqual('foo');
  });

  test('map with no id', async () => {
    const results = await run('getMaps', '<map name="foo"/>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });
});

describe('extracting objects', () => {
  test('simple object', async () => {
    const results = await run('getObjects', '<object data="movie.swf" type="application/x-shockwave-flash" id="foo"></object>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].data).toEqual('movie.swf');
    expect(results[0].id).toEqual('foo');
    expect(results[0].type).toEqual('application/x-shockwave-flash');
  });

  test('object with no id', async () => {
    const results = await run('getObjects', '<object data="movie.swf"/>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('object with no data`', async () => {
    const results = await run('getObjects', '<object id="foo"/>');
    expect(results.length).toBe(1);
    expect(results[0].data).toBeUndefined();
  });

  test('object with no type', async () => {
    const results = await run('getObjects', '<object data="movie.swf"/>');
    expect(results.length).toBe(1);
    expect(results[0].type).toBeUndefined();
  });
});

describe('extracting scripts', () => {
  test('simple script', async () => {
    const results = await run('getScripts', '<script src="script.js" id="foo"></script>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeUndefined();
    expect(results[0].src).toEqual('script.js');
    expect(results[0].id).toEqual('foo');
    expect(results[0].type).toEqual('text/javascript');
  });

  test('script with no id', async () => {
    const results = await run('getScripts', '<script src="script.js"/>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('script with no src', async () => {
    const results = await run('getScripts', '<script/>');
    expect(results.length).toBe(1);
    expect(results[0].src).toBeUndefined();
  });

  test('script with explicit type', async () => {
    const results = await run('getScripts', '<script type="application/ld+json"/>');
    expect(results.length).toBe(1);
    expect(results[0].type).toEqual('application/ld+json');
  });
});

describe('extracting video', () => {
  test('simple video', async () => {
    const results = await run('getVideos', '<video src="foo.webm" id="foo" controls=""></video>');
    expect(results.length).toBe(1);
    expect(results[0].html).toBeDefined();
    expect(results[0].controls).toBeTruthy();
    expect(results[0].src).toEqual('foo.webm');
    expect(results[0].id).toEqual('foo');
    expect(results[0].tracks).toEqual([]);
  });

  test('video with no id', async () => {
    const results = await run('getVideos', '<video src="foo.webm"/>');
    expect(results.length).toBe(1);
    expect(results[0].id).toBeUndefined();
  });

  test('video with no controls', async () => {
    const results = await run('getVideos', '<video src="foo.webm"/>');
    expect(results.length).toBe(1);
    expect(results[0].controls).toBe(false);
  });

  test('video with tracks', async () => {
    const results = await run('getVideos', `
    <video src="foo.webm">
      <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"/>
      <track kind="subtitles" src="foo.fr.vtt" srclang="fr" label="Français"/>
    </video>`);
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

  test('video with sources', async () => {
    const results = await run('getVideos', `
    <video>
      <source src="video.webm" type="video/webm"/>
      <source src="video.mp4" type="video/mp4"/>
    </video>`);
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
  test('no math', async () => {
    const results = await run('hasMathML', '<p>foo</p>');
    expect(results).toBe(false);
  });

  test('with math', async () => {
    const results = await run('hasMathML', '<math><mi>x</mi></math>');
    expect(results).toBe(true);
  });
});

describe('finding pagebreaks', () => {
  test('no breaks', async () => {
    const results = await run('hasPageBreaks', '<p>foo</p>');
    expect(results).toBe(false);
  });

  test('epub:type break', async () => {
    const results = await run('hasPageBreaks', '<span epub:type="pagebreak" />');
    expect(results).toBe(true);
  });

  test('ARIA role break', async () => {
    const results = await run('hasPageBreaks', '<span role="doc-pagebreak"/>');
    expect(results).toBe(true);
  });

  test('pagebreak role among other values', async () => {
    const results = await run('hasPageBreaks', '<span role="foo doc-pagebreak bar"/>');
    expect(results).toBe(true);
  });
});

describe('finding form elements', () => {
  test('no form elements', async () => {
    const results = await run('hasFormElements', '<p>foo</p>');
    expect(results).toBe(false);
  });

  test('form', async () => {
    const results = await run('hasFormElements', '<form/>');
    expect(results).toBe(true);
  });

  test('input', async () => {
    const results = await run('hasFormElements', '<input/>');
    expect(results).toBe(true);
  });

  test('button', async () => {
    const results = await run('hasFormElements', '<button/>');
    expect(results).toBe(true);
  });

  test('select', async () => {
    const results = await run('hasFormElements', '<select/>');
    expect(results).toBe(true);
  });

  test('datalist', async () => {
    const results = await run('hasFormElements', '<datalist/>');
    expect(results).toBe(true);
  });

  test('textarea', async () => {
    const results = await run('hasFormElements', '<textarea/>');
    expect(results).toBe(true);
  });

  test('output', async () => {
    const results = await run('hasFormElements', '<output/>');
    expect(results).toBe(true);
  });

  test('progress', async () => {
    const results = await run('hasFormElements', '<progress/>');
    expect(results).toBe(true);
  });

  test('meter', async () => {
    const results = await run('hasFormElements', '<meter/>');
    expect(results).toBe(true);
  });

  test('option', async () => {
    const results = await run('hasFormElements', '<option/>');
    expect(results).toBe(true);
  });
});
