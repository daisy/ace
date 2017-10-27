'use strict';

const fs = require('fs');
const path = require('path');
const pMap = require('p-map');
const puppeteer = require('puppeteer');
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

const PATH_TO_AXE_PATCH_GETSELECTOR = path.join(__dirname, '../scripts/axe-patch-getselector.js');
if (!fs.existsSync(PATH_TO_AXE_PATCH_GETSELECTOR)) {
  winston.verbose(PATH_TO_AXE_PATCH_GETSELECTOR);
  throw new Error('Can’t find axe-patch-getselector script');
}

const PATH_TO_AXE_PATCH_ARIALOOKUPTABLE = path.join(__dirname, '../scripts/axe-patch-arialookuptable.js');
if (!fs.existsSync(PATH_TO_AXE_PATCH_ARIALOOKUPTABLE)) {
  winston.verbose(PATH_TO_AXE_PATCH_ARIALOOKUPTABLE);
  throw new Error('Can’t find axe-patch-arialookuptable script');
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

async function checkSingle(spineItem, epub, browser) {
  winston.verbose(`- Processing ${spineItem.relpath}`);
  try {
    const page = await browser.newPage();
    await page.goto(spineItem.url);
    // page.on('console', msg => console.log(msg.text));

    // BEGIN HACK
    // Used to differentiate original `script` elements from the one
    // added by Puppeteer.
    // FIXME remove this hack when GoogleChrome/puppeteer#1179 is fixed
    await page.$$eval('script', (scripts) => {
      scripts.forEach(script => script.setAttribute('data-ace-orig', ''));
    });
    // END HACK
    await page.addScriptTag({ path: PATH_TO_AXE });
    await page.addScriptTag({ path: PATH_TO_AXE_PATCH_GETSELECTOR });
    await page.addScriptTag({ path: PATH_TO_AXE_PATCH_ARIALOOKUPTABLE });
    await page.addScriptTag({ path: PATH_TO_H5O });
    await page.addScriptTag({ path: PATH_TO_ACE_AXE });
    await page.addScriptTag({ path: PATH_TO_ACE_EXTRACTION });
    // BEGIN HACK
    // FIXME remove this hack when GoogleChrome/puppeteer#1179 is fixed
    await page.$$eval('script', (scripts) => {
      scripts.forEach(script => {
        if (script.hasAttribute('data-ace-orig')) {
          script.removeAttribute('data-ace-orig');
        } else {
          script.setAttribute('data-ace', '');
        }
      });
    });
    // END HACK


    const results = await page.evaluate(() => new Promise((resolve, reject) => {
        /* eslint-disable */
        window.daisy.ace.run((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res);
        });
        /* eslint-enable */
    }));
    await page.close();

    // Post-process results
    results.assertions = (results.axe != null) ? axe2ace.axe2ace(spineItem, results.axe) : [];
    delete results.axe;
    winston.info(`- ${spineItem.relpath}: ${
      (results.assertions && results.assertions.lentgh > 0)
        ? results.assertions.assertions.length
        : 'No'} issues found`);
    // Resolve path and locators for extracted data
    if (results.data != null) {
      Object.getOwnPropertyNames(results.data).forEach((key) => {
        if (!Array.isArray(results.data[key])) return;
        results.data[key].forEach((item) => {
          if (item.src !== undefined) {
            if (Array.isArray(item.src)) {
              item.src = item.src.map((srcItem) => {
                if (srcItem.src !== undefined) {
                  srcItem.path = path.resolve(path.dirname(spineItem.filepath),
                                              srcItem.src.toString());
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
}

module.exports.check = async (epub) => {
  const browser = await puppeteer.launch();
  winston.info('Checking documents...');
  return pMap(epub.contentDocs, doc => checkSingle(doc, epub, browser), { concurrency: 4 })
  .then(async (results) => {
    await browser.close();
    return results;
  });
};
