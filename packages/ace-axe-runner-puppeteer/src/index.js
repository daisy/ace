'use strict';

const os = require('os');
const puppeteer = require('puppeteer');
const utils = require('@daisy/puppeteer-utils');

let _browser = undefined;

const isDev = process && process.env && (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true');

module.exports = {
    concurrency: 4,
    launch: async function() {
        const args = [];
        if (os.platform() !== 'win32' && os.platform() !== 'darwin') {
            args.push('--no-sandbox')
        }
        _browser = await puppeteer.launch({ args });
        return Promise.resolve();
    },
    close: async function() {
        await _browser.close();
        return Promise.resolve();
    },
    run: async function(url, scripts, scriptContents, basedir) {

        const page = await _browser.newPage();

        if (isDev) {
            page.on('console', msg => {
                console.log(msg.text());
                // process.stdout.write(msg.text());
            });
        }

        await page.setRequestInterception(true);

        page.on('request', (request) => {
            const url = request.url();
            if (url && /^https?:\/\//.test(url)) {
                if (isDev) {
                    console.log(`============> RequestInterception URL abort: ${url}`);
                }
                request.abort();
                return;
            }
            request.continue();
        });
      
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