'use strict';

async function addScripts(paths, page) {
  // BEGIN HACK
  // Used to differentiate original `script` elements from the one
  // added by Puppeteer.
  // FIXME remove this hack when GoogleChrome/puppeteer#1179 is fixed
  await page.$$eval('script', (scripts) => {
    scripts.forEach(script => script.setAttribute('data-ace-orig', ''));
  });
  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const path of paths) {
    await page.addScriptTag({ path });
  }
  /* eslint-enable no-restricted-syntax, no-await-in-loop */
  // BEGIN HACK
  // FIXME remove this hack when GoogleChrome/puppeteer#1179 is fixed
  await page.$$eval('script', (scripts) => {
    scripts.forEach((script) => {
      if (script.hasAttribute('data-ace-orig')) {
        script.removeAttribute('data-ace-orig');
      } else {
        script.setAttribute('data-ace', '');
      }
    });
  });
  // END HACK
}

module.exports = {
  addScripts,
};
