'use strict';

const os = require('os');
const puppeteer = require('puppeteer');
const utils = require('@daisy/puppeteer-utils');

let _browser = undefined;

module.exports = {
    concurrency: 4,
    launch: async function() {
        const args = [];
        if (os.platform() !== 'win32' && os.platform() !== 'darwin') {
            args.push('--no-sandbox')
        }
        _browser = await puppeteer.launch({ args });
    },
    close: async function() {
        await _browser.close();
    },
    run: async function(url, scripts, scriptContents, basedir) {

        const page = await _browser.newPage();
        await page.goto(url);

        await utils.addScriptContents(scriptContents, page);
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
        return results;
    }
};  