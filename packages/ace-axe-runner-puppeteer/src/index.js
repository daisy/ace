'use strict';

const os = require('os');
const fs = require('fs');
const puppeteer = require('puppeteer');
const utils = require('@daisy/puppeteer-utils');
// const { fstat } = require('fs');

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

            if (request.resourceType() === "document" && url && /^file:\//.test(url) && /\.html?$/.test(url)) {
                // console.log("REQUEST HTML: ", url, " ==> ", JSON.stringify(request.headers(), null, 4), request.resourceType());

                // let xhtml = "";
                try {
                    // https://github.com/nodejs/node/blob/7df0fc5c5c074ef9fe342b47eceb6437311aeab8/lib/internal/url.js#L1368-L1376
                    const urlURL = new URL(url);
                    // xhtml = fs.readFileSync(urlURL, 'utf8');
                    fs.readFile(urlURL, 'utf8', (err, xhtml) => {
                        if (err) {
                            console.log("REQUEST HTML FAIL: ", err, url, " ==> ", JSON.stringify(request.headers(), null, 4), request.resourceType());
                            request.continue();
                            return;
                        }
                        request.respond({
                            status: 200,
                            contentType: 'application/xhtml+xml',
                            // headers : {
                            //     "content-type": 'application/xhtml+xml'.
                            // },
                            body: xhtml,
                        });
                    });
                    return;

                } catch (ex) {
                    console.log("REQUEST HTML FAIL: ", ex, url, " ==> ", JSON.stringify(request.headers(), null, 4), request.resourceType());
                }
            }

            request.continue();
        });
      
        // page.on('response', (resp) => {
        //     console.log("RESPONSE: ", resp.url(), " ==> ", JSON.stringify(resp.headers(), null, 4), resp.status());
        // });
      
        await page.goto(url);

        await utils.addScriptContents(scriptContents, page);
        await utils.addScripts(scripts, page);

        const results = await page.evaluate(() => new Promise((resolve, reject) => {
            /* eslint-disable */
            try {
                window.tryAceAxe = () => {
                    if (!window.daisy ||
                        !window.daisy.ace ||
                        !window.daisy.ace.run ||
                        !window.daisy.ace.createReport
                        || !window.axe
                        // || !window.HTML5Outline
                    ) {
        
                        window.tryAceAxeN++;
                        if (window.tryAceAxeN < 15) {
                            setTimeout(window.tryAceAxe, 400);
                            return;
                        }
        
                        reject("window.tryAceAxe " + window.tryAceAxeN);
                        return;
                    }
        
                    window.daisy.ace.run((err, res) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(res);
                    });
                };
                window.tryAceAxeN = 0;
                window.tryAceAxe();
            } catch (exc) {
                reject(exc);
            }
            /* eslint-enable */
        }));
        await page.close();
        return results;
    }
};  