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
  return new Promise((resolve, reject) => {
    runAce(epub, Object.assign({
      outdir: outdir.name,
      tmp: tmpdir.name,
      verbose: true,
      silent: true,
    }, options))
      .then(() => {
        // expect(fs.existsSync(reportPath)).toBeTruthy();
        resolve(JSON.parse(fs.readFileSync(reportPath, 'utf8')));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

test('well-formed EPUB archive is processed', async () => {
  expect.assertions(2);
  let report = undefined;
  try {
    report = await ace(path.join(__dirname, '../data/base-epub-30.epub'));
  } catch (err) {
    console.log("ERROR: " + err);
    expect(err).toBe("ERROR?");
    return;
  }
  expect(report).toBeDefined();
  expect(report['earl:result']).toBeDefined();
});

test('an EPUB archive with an extra comment length is repaired', async () => {
  expect.assertions(2);
  let report = undefined;
  try {
    report = await ace(path.join(__dirname, '../data/zip-invalid-comment-length.epub'));
  } catch (err) {
    console.log("ERROR: " + err);
    expect(err).toBe("ERROR?");
    return;
  }
  expect(report).toBeDefined();
  expect(report['earl:result']).toBeDefined();
});

test('an EPUB archive beyond repair is rejected', async () => {
  expect.assertions(2);
  let report = undefined;
  try {
    report = await ace(path.join(__dirname, '../data/zip-invalid.epub'));
  } catch (err) {
    expect(err).toBeDefined();
    // console.log("ERROR: " + err);
    expect(report).toBeUndefined();
  }
});