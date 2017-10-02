'use strict';

const fs = require('fs');
const path = require('path');
const Nightmare = require('nightmare');
const axe2ace = require('../report/axe2ace.js');
const winston = require('winston');

const PATH_TO_AXE = path.join(path.dirname(require.resolve('axe-core')), 'axe.min.js');
if (!fs.existsSync(PATH_TO_AXE)) {
  winston.verbose(PATH_TO_AXE);
  throw new Error('Can’t find aXe');
}

const PATH_TO_H5O = path.join(path.dirname(require.resolve('h5o')), 'dist/outliner.min.js');
if (!fs.existsSync(PATH_TO_H5O)) {
  winston.verbose(PATH_TO_H5O);
  throw new Error('Can’t find h5o');
}

const PATH_TO_ACE_AXE = path.join(__dirname, '../scripts/ace-axe.js');
if (!fs.existsSync(PATH_TO_ACE_AXE)) {
  winston.verbose(PATH_TO_ACE_AXE);
  throw new Error('Can’t find ace-axe script');
}

const PATH_TO_ACE_EXTRACTION = path.join(__dirname, '../scripts/ace-extraction.js');
if (!fs.existsSync(PATH_TO_ACE_EXTRACTION)) {
  winston.verbose(PATH_TO_ACE_EXTRACTION);
  throw new Error('Can’t find ace-extraction script');
}
// EMXIF

Nightmare.action('axe', function axe(done) {
  // Node JS runtime
  this.evaluate_now(
    (callback) => {
      // Browser JS runtime
      /* eslint-disable */
      window.daisy.ace.run(callback);
      /* eslint-enable */
    }, done);
});

function checkSingle(spineItem, epub, nightmare) {
  winston.info(`- ${spineItem.relpath}`);

  return nightmare
    .goto(spineItem.url)
    .inject('js', PATH_TO_AXE)
    .inject('js', PATH_TO_H5O)
    .inject('js', PATH_TO_ACE_AXE)
    .inject('js', PATH_TO_ACE_EXTRACTION)
    .wait(50)
    .axe()
    .then((json) => {
      const results = json;
      results.assertions = (json.axe != null) ? axe2ace.axe2ace(spineItem, json.axe) : [];
      delete results.axe;
      winston.info(`- ${
        (results.assertions == null)
          ? 'No'
          : results.assertions.assertions.length} issues found`);
      if (results.data != null && results.data.images != null) {
        results.data.images.forEach((img) => {
          const imageFullPath = path.resolve(path.dirname(spineItem.filepath), img.path);
          const imageRelPath = path.relative(epub.basedir, imageFullPath);
          img.filepath = imageFullPath;
          img.path = imageRelPath;
          img.location = `${spineItem.relpath}#epubcfi(${img.cfi})`;
        });
      }
      return results;
    })
    .catch((err) => {
      winston.debug(`Error when running nightmare: ${JSON.stringify(err, null, 2)}`);
      throw new Error('Failed to check HTML content');
    });
}

module.exports.check = (epub) => {
  const nightmare = Nightmare({
    show: false,
    alwaysOnTop: false,
    openDevTools: {
      mode: 'detach',
    },
  });
  return epub.contentDocs.reduce((sequence, spineItem) =>
    sequence.then(results =>
      checkSingle(spineItem, epub, nightmare)
      .then((result) => {
        results.push(result);
        return results;
      })), Promise.resolve([]))
  .then(results => nightmare.end(() => results));
};
