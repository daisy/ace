/* eslint-env browser, jest */

'use strict';

const paths = require('path');
const utils = require('@daisy/puppeteer-utils');

async function closePage() {
  await global.page.close();
}

async function injectJestMock() {
  await utils.addScripts(
    [paths.resolve(require.resolve('jest-mock'), '../../build-es5/index.js')], global.page);
  await global.page.evaluate(() => {
    window.mock = new window['jest-mock'].ModuleMocker();
  });
}

async function injectScripts(scripts) {
  await utils.addScripts(scripts, global.page);
}

async function insertBody(markup) {
  await global.page.evaluate((innerBody) => {
    document.body.innerHTML = innerBody;
  }, markup);
}

async function loadXHTMLPage() {
  global.page = await global.browser.newPage();
  await global.page.goto(`data:application/xhtml+xml,<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
  <head>
    <title></title>
  </head>
  <body>
  </body>
</html>`);
}

function redirectConsole() {
  global.page.on('console', msg => console.log(msg.text));
}


module.exports = {
  closePage,
  injectJestMock,
  injectScripts,
  insertBody,
  loadXHTMLPage,
  redirectConsole,
};
