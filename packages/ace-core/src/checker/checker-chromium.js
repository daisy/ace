'use strict';

const fileUrl = require('file-url');
const fs = require('fs-extra');
const path = require('path');
const pMap = require('p-map');
const tmp = require('tmp');
const winston = require('winston');

const axe2ace = require('@daisy/ace-report-axe');

const { getRawResourcesForCurrentLanguage } = require('../l10n/localize').localizer;

tmp.setGracefulCleanup();

const scripts = [
  // require.resolve('../scripts/function-bind-bound-object.js'),
  require.resolve('../scripts/vendor/outliner.min.js'),
  path.resolve(require.resolve('axe-core'), '../axe.js'),
  // require.resolve('../scripts/axe-patch-aria-roles.js'),
  // require.resolve('../scripts/axe-patch-is-aria-role-allowed.js'),
  // require.resolve('../scripts/axe-patch-only-list-items.js'),
  // require.resolve('../scripts/axe-patch-listitem.js'),
  require.resolve('../scripts/ace-axe.js'),
  require.resolve('../scripts/ace-extraction.js'),
];

const LOG_DEBUG_URLS = process.env.LOG_DEBUG_URLS === "1";

async function checkSingle(spineItem, epub, lang, axeRunner) {
  winston.verbose(`- Processing ${spineItem.relpath}`);
  try {
    if (LOG_DEBUG_URLS) {
        console.log("....... URL 1");
        console.log(spineItem.url);
        console.log(spineItem.filepath);
        console.log(spineItem.relpath);
    }
    let url = spineItem.url;
    let ext = path.extname(spineItem.filepath);
    
    // File extensions other than 'xhtml' or 'html' are not propertly loaded
    // by puppeteer, so we copy the file to a new `.xhtml` temp file.
    if (!process.versions['electron'] && // The Electron-based Axe runner handles .xml files just fine
      ext !== '.xhtml' && ext !== '.html') {

      winston.warn(`Copying document with extension '${ext}' to a temporary '.xhtml' file…`);
      const tmpdir = tmp.dirSync({ unsafeCleanup: true }).name;
      const tmpFile = path.join(tmpdir, `${path.basename(spineItem.filepath, ext)}.xhtml`)
      fs.copySync(spineItem.filepath, tmpFile);

      // does encodeURI() as per https://tools.ietf.org/html/rfc3986#section-3.3 in a nutshell: encodeURI(`file://${tmpFile}`).replace(/[?#]/g, encodeURIComponent)
      url = fileUrl(tmpFile);
      // url = "file://" + encodeURI(tmpFile);

      winston.debug(`checking copied file at ${tmpFile}`)
    }

    if (LOG_DEBUG_URLS) {
      console.log("....... URL 2");
      console.log(url);
    }

    const scriptContents = [];
    let localePath = "";
    try {
      winston.debug(`- Axe locale: [${lang}]`);

      // https://github.com/dequelabs/axe-core#localization
      // https://github.com/dequelabs/axe-core/tree/develop/locales

      if (lang && lang !== "en" && lang.indexOf("en-") !== 0) { // default English built into Axe source code
        localePath = path.resolve(require.resolve('axe-core'), `../locales/${lang}.json`);
        if (fs.existsSync(localePath)) {
          const localeStr = fs.readFileSync(localePath, { encoding: "utf8" });
          const localeScript = `window.__axeLocale__=${localeStr};`;
          scriptContents.push(localeScript);
        } else {
          winston.debug(`- Axe locale missing? [${lang}] => ${localePath}`);
        }
      }

      // let localizedScript = "";
      // const rawJson = getRawResourcesForCurrentLanguage();

      // ["axecheck", "axerule"].forEach((checkOrRule) => {
      //   const checkOrRuleKeys = Object.keys(rawJson[checkOrRule]);
      //   for (const checkOrRuleKey of checkOrRuleKeys) {
      //     const msgs = Object.keys(rawJson[checkOrRule][checkOrRuleKey]);
      //     for (const msg of msgs) {
      //       const k = `__aceLocalize__${checkOrRule}_${checkOrRuleKey}_${msg}`;
      //       let v = rawJson[checkOrRule][checkOrRuleKey][msg];
      //       if (v) {
      //         v = v.replace(/"/g, '\\"');
      //       }
      //       localizedScript += `window['${k}']="${v}";\n`;
      //     }
      //   }
      // });
      // scriptContents.push(localizedScript);

    } catch (err) {
      console.log(err);
      winston.verbose(err);
      winston.debug(`- Axe locale problem? [${lang}] => ${localePath}`);
    }

    const results = await axeRunner.run(url, scripts, scriptContents, epub.basedir);

    // Post-process results
    if (!results.axe) {
      results.assertions = [];
    } else {
      results.assertions = await axe2ace.axe2ace(spineItem, results.axe, lang);
      delete results.axe;
    }

    winston.info(`- ${spineItem.relpath}: ${
      (results.assertions && results.assertions.assertions && results.assertions.assertions.length > 0)
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
                  if (LOG_DEBUG_URLS) {
                    console.log("----- ITEMs SRC 1");
                    console.log(srcItem.src);
                  }
                  srcItem.path = path.resolve(path.dirname(spineItem.filepath), decodeURI(srcItem.src.toString()));
                  if (LOG_DEBUG_URLS) {
                    console.log("----- ITEMs SRC 2");
                    console.log(srcItem.path);
                  }
                  srcItem.src = path.relative(epub.basedir, srcItem.path).replace(/\\/g, "/");
                  if (LOG_DEBUG_URLS) {
                    console.log("----- ITEMs SRC 3");
                    console.log(srcItem.src);
                  }
                }
                return srcItem;
              });
            } else {
              if (LOG_DEBUG_URLS) {
                console.log("----- ITEM SRC 1");
                console.log(item.src);
              }
              item.path = path.resolve(path.dirname(spineItem.filepath), decodeURI(item.src.toString()));
              if (LOG_DEBUG_URLS) {
                console.log("----- ITEM SRC 2");
                console.log(item.path);
              }
              item.src = path.relative(epub.basedir, item.path).replace(/\\/g, "/");
              if (LOG_DEBUG_URLS) {
                console.log("----- ITEM SRC 3");
                console.log(item.src);
              }
            }
            if (item.cfi !== undefined) {
              if (LOG_DEBUG_URLS) {
                console.log("----- CFI 1");
                console.log(spineItem.relpath);
                console.log(item.cfi);
              }
              item.location = `${encodeURI(spineItem.relpath)}#epubcfi(${encodeURI(item.cfi)})`;
              if (LOG_DEBUG_URLS) {
                console.log("----- CFI 2");
                console.log(item.location);
              }
              delete item.cfi;
            }
          }
        });
      });
    }
    return results;
  } catch (err) {
    console.log(err);
    winston.debug(`Error when running HTML checks: ${err.message ? err.message : err}`);
    if (err.stack) winston.debug(err.stack);

    throw new Error(`Failed to check Content Document '${spineItem.relpath}': ${err.message ? err.message : err}`);
  }
}

module.exports.check = async (epub, lang, axeRunner) => {
  await axeRunner.launch();
  winston.info('Checking documents...');
  return pMap(epub.contentDocs, doc => checkSingle(doc, epub, lang, axeRunner), { concurrency: axeRunner.concurrency })
  .then(async (results) => {
    await axeRunner.close();
    return results;
  }).catch(async (err) => {
    winston.error(`Ace HTML check error: ${err.message ? err.message : err}`);
    if (err.stack) winston.debug(err.stack);

    await axeRunner.close();

    throw new Error(err);
  });
};
