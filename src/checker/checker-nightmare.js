'use strict';

const fs = require('fs');
const path = require('path');
const Nightmare = require('nightmare');
const report = require('../report/report.js');
const axe2ace = require('../report/axe2ace.js');

const PATH_TO_AXE = path.join(__dirname, '../axe/axe.min.js');
if (!fs.existsSync(PATH_TO_AXE)) {
  console.log(PATH_TO_AXE);
  process.exit(1);
}

const PATH_TO_WEBVIEWJS = path.join(__dirname, '../scripts/webview.js');
if (!fs.existsSync(PATH_TO_WEBVIEWJS)) {
  console.log(PATH_TO_WEBVIEWJS);
  process.exit(1);
}

const PATH_TO_WEBVIEWJS_EACT = path.join(__dirname, '../scripts/webview_eact.js');
if (!fs.existsSync(PATH_TO_WEBVIEWJS_EACT)) {
  console.log(PATH_TO_WEBVIEWJS_EACT);
  process.exit(1);
}
// EMXIF

Nightmare.action(
  'axe',
  function axe(axeUrl, axeDoneFunction, nightmareDoneFunction) {
    // Node JS runtime
    this.evaluate_now(
      (jsURL, jsDoneFunction) => {
        // Browser JS runtime
        /* eslint-disable */
        window._eact_RUN(jsURL, jsDoneFunction);
        /* eslint-enable */
      },

      // jsDoneFunction
      (axeJsonResult) => {
        // Node JS runtime
        axeDoneFunction(axeJsonResult);
        nightmareDoneFunction(null, axeJsonResult);
      },

      axeUrl);
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
    .inject('js', PATH_TO_WEBVIEWJS_EACT)
    .inject('js', PATH_TO_WEBVIEWJS)
    .wait(50)
    .axe(spineItem.url, () => {})
    .then(jsonStr => JSON.parse(jsonStr))
    .then((jsonStr) => {
        var results = axe2ace.axe2ace(spineItem, jsonStr);
        if (results != null) {
          report.addContentDocAssertion(results);
        }
        return results;
    });
}

/*module.exports.check = urls =>
  urls.reduce((sequence, url) =>
    sequence.then(results =>
      checkSingle(url)
      .then((result) => {
        results.push(result);
        return results;
      })), Promise.resolve([]))
  .then(results => nightmare.end(() => results));
*/
module.exports.check = spineItems =>
  spineItems.reduce((sequence, spineItem) =>
    sequence.then(results =>
      checkSingle(spineItem)
      .then((result) => {
        results.push(result);
        return results;
      })), Promise.resolve([]))
  .then(results => nightmare.end(() => results));
