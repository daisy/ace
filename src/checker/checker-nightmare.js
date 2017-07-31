'use strict';

const fs = require('fs');
const path = require('path');
const Nightmare = require('nightmare');
const report = require('../report/report.js');
const axe2ace = require('../report/axe2ace.js');

const PATH_TO_AXE = path.join(__dirname, '../ext/axe/axe.min.js');
if (!fs.existsSync(PATH_TO_AXE)) {
  console.log(PATH_TO_AXE);
  process.exit(1);
}

const PATH_TO_H5O = path.join(__dirname, '../ext/h5o/outliner.min.js');
if (!fs.existsSync(PATH_TO_H5O)) {
  console.log(PATH_TO_H5O);
  process.exit(1);
}

const PATH_TO_ACE_AXE = path.join(__dirname, '../scripts/ace-axe.js');
if (!fs.existsSync(PATH_TO_ACE_AXE)) {
  console.log(PATH_TO_ACE_AXE);
  process.exit(1);
}

const PATH_TO_ACE_EXTRACTION = path.join(__dirname, '../scripts/ace-extraction.js');
if (!fs.existsSync(PATH_TO_ACE_EXTRACTION)) {
  console.log(PATH_TO_ACE_EXTRACTION);
  process.exit(1);
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

const nightmare = Nightmare({
  show: false,
  alwaysOnTop: false,
  openDevTools: {
    mode: 'detach',
  },
});

function checkSingle(spineItem) {
  // console.log(`>>>>>>>>>> PROCESSING URL: ${url}`);

  return nightmare
    .goto(spineItem.url)
    .inject('js', PATH_TO_AXE)
    .inject('js', PATH_TO_H5O)
    .inject('js', PATH_TO_ACE_AXE)
    .inject('js', PATH_TO_ACE_EXTRACTION)
    .wait(50)
    .axe()
    .then((json) => {
      const results = axe2ace.axe2ace(spineItem, json);
      if (results != null) {
        report.addContentDocAssertion(results);
      }
      return results;
    });
}

module.exports.check = spineItems =>
  spineItems.reduce((sequence, spineItem) =>
    sequence.then(results =>
      checkSingle(spineItem)
      .then((result) => {
        results.push(result);
        return results;
      })), Promise.resolve([]))
  .then(results => nightmare.end(() => results));
