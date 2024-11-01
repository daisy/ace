/* eslint-disable import/no-extraneous-dependencies */

'use strict';

// yarn test -t="packages/ace-core/src/scripts/ace-extraction.test.js"

const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const puppeteer = require('puppeteer');
const os = require('os');

class HeadlessChromeEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    // console.log(config.globalConfig);
    // console.log(config.projectConfig);
    // this.testPath = context.testPath;
    // this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    // await super.setup();
    // await someSetupTasks(this.testPath);
    // this.global.someGlobalObject = createGlobalObject();
    // // Will trigger if docblock contains @my-custom-pragma my-pragma-value
    // if (this.docblockPragmas['my-custom-pragma'] === 'my-pragma-value') {
    //   // ...
    // }

    const args = [];
    // if (os.platform() !== 'win32' && os.platform() !== 'darwin') {
    //   args.push('--no-sandbox')
    // }
    args.push('--no-sandbox');
    args.push('--disable-setuid-sandbox');

    await super.setup();

    await puppeteer.launch({ args, headless: true }).then((browser) => {
      this.global.browser = browser;
    });
  }

  async teardown() {
    // this.global.someGlobalObject = destroyGlobalObject();
    // await someTeardownTasks();
    // await super.teardown();

    this.global.browser.close().then(async () => await super.teardown());
  }

  getVmContext() {
    return super.getVmContext();
  }

  // async handleTestEvent(event, state) {
  //   if (event.name === 'test_start') {
  //     // ...
  //   }
  // }
}

module.exports = HeadlessChromeEnvironment;
