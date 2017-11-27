'use strict';

let checkSingle = (() => {
  var _ref = _asyncToGenerator(function* (spineItem, epub, browser) {
    winston.verbose(`- Processing ${spineItem.relpath}`);
    try {
      const page = yield browser.newPage();
      yield page.goto(spineItem.url);
      yield utils.addScripts(scripts, page);

      const results = yield page.evaluate(function () {
        return new Promise(function (resolve, reject) {
          /* eslint-disable */
          window.daisy.ace.run(function (err, res) {
            if (err) {
              return reject(err);
            }
            return resolve(res);
          });
          /* eslint-enable */
        });
      });
      yield page.close();

      // Post-process results
      results.assertions = results.axe != null ? axe2ace.axe2ace(spineItem, results.axe) : [];
      delete results.axe;
      winston.info(`- ${spineItem.relpath}: ${results.assertions && results.assertions.assertions.length > 0 ? results.assertions.assertions.length : 'No'} issues found`);
      // Resolve path and locators for extracted data
      if (results.data != null) {
        Object.getOwnPropertyNames(results.data).forEach(function (key) {
          if (!Array.isArray(results.data[key])) return;
          results.data[key].forEach(function (item) {
            if (item.src !== undefined) {
              if (Array.isArray(item.src)) {
                item.src = item.src.map(function (srcItem) {
                  if (srcItem.src !== undefined) {
                    srcItem.path = path.resolve(path.dirname(spineItem.filepath), srcItem.src.toString());
                    srcItem.src = path.relative(epub.basedir, srcItem.path);
                  }
                  return srcItem;
                });
              } else {
                item.path = path.resolve(path.dirname(spineItem.filepath), item.src.toString());
                item.src = path.relative(epub.basedir, item.path);
              }
              if (item.cfi !== undefined) {
                item.location = `${spineItem.relpath}#epubcfi(${item.cfi})`;
                delete item.cfi;
              }
            }
          });
        });
      }
      return results;
    } catch (err) {
      winston.debug(`Error when running HTML checks: ${err}`);
      throw new Error('Failed to check HTML content');
    }
  });

  return function checkSingle(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs');
const path = require('path');
const pMap = require('p-map');
const puppeteer = require('puppeteer');
const winston = require('winston');

const axe2ace = require('../report/axe2ace.js');
const utils = require('./puppeteer-utils');

const scripts = [path.resolve(require.resolve('axe-core'), '../axe.min.js'), path.resolve(require.resolve('h5o'), '../dist/outliner.min.js'), require.resolve('../scripts/axe-patch-getselector.js'), require.resolve('../scripts/axe-patch-arialookuptable.js'), require.resolve('../scripts/ace-axe.js'), require.resolve('../scripts/ace-extraction.js')];

module.exports.check = (() => {
  var _ref2 = _asyncToGenerator(function* (epub) {
    const browser = yield puppeteer.launch();
    winston.info('Checking documents...');
    return pMap(epub.contentDocs, function (doc) {
      return checkSingle(doc, epub, browser);
    }, { concurrency: 4 }).then((() => {
      var _ref3 = _asyncToGenerator(function* (results) {
        yield browser.close();
        return results;
      });

      return function (_x5) {
        return _ref3.apply(this, arguments);
      };
    })());
  });

  return function (_x4) {
    return _ref2.apply(this, arguments);
  };
})();