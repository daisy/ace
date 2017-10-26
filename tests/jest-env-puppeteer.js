/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

class HeadlessChromeEnvironment extends NodeEnvironment {

  setup() {
    return super.setup().then(() =>
      puppeteer.launch().then((browser) => {
        this.global.browser = browser;
      }));
  }

  teardown() {
    return this.global.browser.close().then(() => super.teardown());
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = HeadlessChromeEnvironment;
