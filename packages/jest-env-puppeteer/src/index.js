/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');
const os = require('os');

class HeadlessChromeEnvironment extends NodeEnvironment {

  setup() {
    const args = [];
    if (os.platform() !== 'win32' && os.platform() !== 'darwin') {
      args.push('--no-sandbox')
    }
    return super.setup().then(() =>
      puppeteer.launch({ args }).then((browser) => {
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
