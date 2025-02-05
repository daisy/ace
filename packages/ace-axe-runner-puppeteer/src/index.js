'use strict';

const os = require('os');
const fs = require('fs');
const puppeteer = require('puppeteer');
const utils = require('@daisy/puppeteer-utils');
// const { fstat } = require('fs');

let _browser = undefined;

const isDev = process && process.env && (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true');

let _MILLISECONDS_TIMEOUT_INITIAL = 0;
try {
    _MILLISECONDS_TIMEOUT_INITIAL = process.env.ACE_TIMEOUT_INITIAL ? parseInt(process.env.ACE_TIMEOUT_INITIAL, 10) : 0;
} catch(_e) {
    // ignore
}
let _MILLISECONDS_TIMEOUT_EXTENSION = 0;
try {
    _MILLISECONDS_TIMEOUT_EXTENSION = process.env.ACE_TIMEOUT_EXTENSION ? parseInt(process.env.ACE_TIMEOUT_EXTENSION, 10) : 0;
} catch(_e) {
    // ignore
}
const MILLISECONDS_TIMEOUT_INITIAL = _MILLISECONDS_TIMEOUT_INITIAL || 5000; // 5s check to load the browser window web contents
const MILLISECONDS_TIMEOUT_EXTENSION = _MILLISECONDS_TIMEOUT_EXTENSION || 240000; // 240s (4mn) runtime (window contents usually loads fast, but Axe runtime takes time...)

let cliOption_MILLISECONDS_TIMEOUT_EXTENSION = undefined;

module.exports = {
    setTimeout: function (ms) {
      try {
          cliOption_MILLISECONDS_TIMEOUT_EXTENSION = parseInt(ms, 10);
      } catch(_e) {
          // ignore
      }
    },
    concurrency: 4,
    launch: async function() {
        const args = [];
        // if (os.platform() !== 'win32' && os.platform() !== 'darwin') {
        //     args.push('--no-sandbox')
        // }
        args.push('--no-sandbox');
        args.push('--disable-setuid-sandbox');
        // --disable-gpu ?

        // https://github.com/puppeteer/puppeteer/blob/2b8ee62475b6614fc95b963c399b0bbad32e9e70/packages/puppeteer-core/src/common/ConnectOptions.ts#L88-L93
        // https://github.com/puppeteer/puppeteer/blob/2b8ee62475b6614fc95b963c399b0bbad32e9e70/packages/puppeteer-core/src/node/BrowserLauncher.ts#L85
        _browser = await puppeteer.launch({
            args,
            headless: true,
            timeout: MILLISECONDS_TIMEOUT_INITIAL, // 30000 default
            protocolTimeout: cliOption_MILLISECONDS_TIMEOUT_EXTENSION || MILLISECONDS_TIMEOUT_EXTENSION, // 180000 default
        });
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

        let results = undefined;
        try {
        results = await page.evaluate(() => new Promise((resolve, reject) => {
          /* eslint-disable */
          try {
            window.tryAceAxe = () => {
              if (!window.daisy ||
                !window.daisy.ace ||
                !window.daisy.ace.run ||
                !window.daisy.ace.createReport
                || !window.axe
                // || !window.HTML5Outline
              ) {

                window.tryAceAxeN++;
                if (window.tryAceAxeN < 15) {
                  setTimeout(window.tryAceAxe, 400);
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
            window.tryAceAxeN = 0;
            window.tryAceAxe();
          } catch (exc) {
            reject(exc);
          }
          /* eslint-enable */
        }));
        } catch (err) {
          // ProtocolError: Runtime.callFunctionOn timed out. Increase the 'protocolTimeout' setting in launch/connect calls for a higher timeout if needed.
          if (err && err.toString && err.toString().indexOf("protocolTimeout") >= 0) {
            err = new Error(`Timeout :( ${cliOption_MILLISECONDS_TIMEOUT_EXTENSION || MILLISECONDS_TIMEOUT_EXTENSION}ms`);
          }
          try {
            await page.close();
          } catch (_e) {
          }
          throw err;
        }
        await page.close();
        return results;
    }
};
