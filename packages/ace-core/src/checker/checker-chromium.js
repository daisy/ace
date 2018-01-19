'use strict';

const fileUrl = require('file-url');
const fs = require('fs-extra');
const path = require('path');
const pMap = require('p-map');
const puppeteer = require('puppeteer');
const os = require('os');
const tmp = require('tmp');
const winston = require('winston');

const axe2ace = require('@daisy/ace-report-axe');
const utils = require('@daisy/puppeteer-utils');

tmp.setGracefulCleanup();

const scripts = [
  path.resolve(require.resolve('axe-core'), '../axe.min.js'),
  require.resolve('../scripts/vendor/outliner.min.js'),
  require.resolve('../scripts/axe-patch-arialookuptable.js'),
  require.resolve('../scripts/ace-axe.js'),
  require.resolve('../scripts/ace-extraction.js'),
];

async function checkSingle(spineItem, epub, browser) {
  winston.verbose(`- Processing ${spineItem.relpath}`);
  try {
    let url = spineItem.url;
    let ext = path.extname(spineItem.filepath);
    
    // File extensions other than 'xhtml' or 'html' are not propertly loaded
    // by puppeteer, so we copy the file to a new `.xhtml` temp file.
    if (ext !== '.xhtml' && ext !== '.html') {
      winston.warn(`Copying document with extension '${ext}' to a temporary '.xhtml' file…`);
      const tmpdir = tmp.dirSync({ unsafeCleanup: true }).name;
      const tmpFile = path.join(tmpdir, `${path.basename(spineItem.filepath, ext)}.xhtml`)
      fs.copySync(spineItem.filepath, tmpFile);
      url = fileUrl(tmpFile);
      winston.debug(`checking copied file at ${url}`)
    }
    
    const page = await browser.newPage();
    await page.goto(url);
    await utils.addScripts(scripts, page);

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
      (results.assertions && results.assertions.assertions.length > 0)
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
    throw new Error(`Failed to check Content Document '${spineItem.relpath}'`);
  }
}

module.exports.check = async (epub) => {
  const args = [];
  if (os.platform() !== 'win32' && os.platform() !== 'darwin') {
    args.push('--no-sandbox')
  }
  const browser = await puppeteer.launch({ args });
  winston.info('Checking documents...');
  return pMap(epub.contentDocs, doc => checkSingle(doc, epub, browser), { concurrency: 4 })
  .then(async (results) => {
    await browser.close();
    return results;
  });
};
