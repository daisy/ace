'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const electron = require('electron');
const app = electron.app;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;
// const webContents = electron.webContents;
// const ipcMain = electron.ipcMain;

const express = require('express');
const portfinder = require('portfinder');
// const http = require('http');
const https = require('https');

const generateSelfSignedData = require('./selfsigned').generateSelfSignedData;

const logger = require('@daisy/ace-logger');
logger.initLogger({ verbose: true, silent: false });

let isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
const showWindow = false;

const LOG_DEBUG = false;
const AXE_LOG_PREFIX = "[AXE]";

const SESSION_PARTITION = "persist:axe";

const HTTP_QUERY_PARAM = "AXE_RUNNER";

let expressApp;
let httpServer;
let port;
let ip;
let proto;
let rootUrl;

let browserWindow = undefined;

const jsCache = {};

function axeRunnerInitEvents(eventEmmitter) {

    app.on("certificate-error", (event, webContents, u, error, certificate, callback) => {
        if (u.indexOf(`${rootUrl}/`) === 0) {
            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTTPS cert error OKAY ${u}`);
            callback(true);
            return;
        }
        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTTPS cert error FAIL ${u}`);
        callback(false);
    });

    const filter = { urls: ["*", "*://*/*"] };

    // const onHeadersReceivedCB = (details, callback) => {
    //     if (!details.url) {
    //         callback({});
    //         return;
    //     }

    //     if (details.url.indexOf(`${rootUrl}/`) === 0) {
    //         if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} CSP ${details.url}`);
    //         callback({
    //             // responseHeaders: {
    //             //     ...details.responseHeaders,
    //             //     "Content-Security-Policy":
    //             //         [`default-src 'self' 'unsafe-inline' 'unsafe-eval' data: http: https: ${rootUrl}`],
    //             // },
    //         });
    //     } else {
    //         if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} !CSP ${details.url}`);
    //         callback({});
    //     }
    // };

    const setCertificateVerifyProcCB = (request, callback) => {

        if (request.hostname === ip) {
            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTTPS cert verify OKAY ${request.hostname}`);
            callback(0); // OK
            return;
        }
        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTTPS cert verify FALLBACK ${request.hostname}`);
        callback(-3); // Chromium
        // callback(-2); // Fail
    };

    const sess = session.fromPartition(SESSION_PARTITION, { cache: true }); // || session.defaultSession;

    if (sess) {
        // sess.webRequest.onHeadersReceived(filter, onHeadersReceivedCB);
        // sess.webRequest.onBeforeSendHeaders(filter, onBeforeSendHeadersCB);
        sess.setCertificateVerifyProc(setCertificateVerifyProcCB);
    }

    eventEmmitter.on('AXE_RUNNER_CLOSE', (event, arg) => {
        const payload = arg ? arg : event;
        const sender = arg ? event.sender : eventEmmitter;

        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner closing ...`);

        if (browserWindow) {
            if (!(isDev && showWindow)) {
                browserWindow.close();
                browserWindow = undefined;
            }
        }

        if (httpServer) {
            httpServer.close();
            httpServer = undefined;
        }

        let _closed = false;
        function closed() {
            if (_closed) {
                return;
            }
            _closed = true;
            sender.send("AXE_RUNNER_CLOSED");
        }
        let _done = 0;
        function done() {
            _done++;
            if (_done === 2) {
                closed();
            }
        }
        setTimeout(() => {
            closed();
        }, 3000);

        const sess = session.fromPartition(SESSION_PARTITION, { cache: true }); // || session.defaultSession;
        if (sess) {
            sess.clearCache(() => {
                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} session cache cleared`);
                done();
            });

            sess.clearStorageData({
                origin: "*",
                quotas: [
                    "temporary",
                    "persistent",
                    "syncable",
                ],
                storages: [
                    "appcache",
                    "cookies",
                    "filesystem",
                    "indexdb",
                    "localstorage",
                    "shadercache",
                    "websql",
                    "serviceworkers",
                ],
            }, () => {
                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} session storage cleared`);
                done();
            });
        }
    });

    eventEmmitter.on('AXE_RUNNER_RUN', (event, arg) => {
        const payload = arg ? arg : event;
        const sender = arg ? event.sender : eventEmmitter;

        const basedir = payload.basedir;
        const uarel = payload.url;
        const scripts = payload.scripts;
        const scriptContents = payload.scriptContents;

        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner running ... ${basedir} ${uarel}`);

        function doRun() {

             // windows! file://C:\aa\bb\chapter.xhtml
            const uarelObj = url.parse(uarel.replace(/\\/g, "/"));
            const windowsDrive = uarelObj.hostname ? `${uarelObj.hostname.toUpperCase()}:` : "";
            const httpUrl = rootUrl + (windowsDrive + decodeURI(uarelObj.pathname)).replace(basedir.replace(/\\/g, "/"), "");

            let replySent = false;

            browserWindow.webContents.once("dom-ready", () => {
                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner DOM READY ${httpUrl}`);

                const js = `
new Promise((resolve, reject) => {
    window.daisy.ace.run((err, res) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(res);
    });
}).then(res => res).catch(err => { throw err; });
`;
                browserWindow.webContents.executeJavaScript(js, true)
                    .then((ok) => {
                        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner done.`);
                        if (replySent) {
                            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner WAS TIMEOUT!`);
                            return;
                        }
                        replySent = true;

                        sender.send("AXE_RUNNER_RUN_", {
                            ok
                        });
                    })
                    .catch((err) => {
                        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner fail!`);
                        if (replySent) {
                            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner WAS TIMEOUT!`);
                            return;
                        }
                        replySent = true;

                        sender.send("AXE_RUNNER_RUN_", {
                            err
                        });
                    });
            });

            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner LOAD URL ... ${httpUrl}`);
            browserWindow.loadURL(`${httpUrl}?${HTTP_QUERY_PARAM}=1`);

            setTimeout(() => {
                if (replySent) {
                    return;
                }
                replySent = true;

                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner timeout!`);
                sender.send("AXE_RUNNER_RUN_", {
                    err: "Timeout :("
                });
            }, 10000);
        }

        if (!httpServer) { // lazy init
            startAxeServer(basedir, scripts, scriptContents).then(() => {
                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} server started`);

                browserWindow = new BrowserWindow({
                    show: showWindow,
                    webPreferences: {
                        devTools: isDev && showWindow,
                        title: "Axe Electron runner",
                        allowRunningInsecureContent: false,
                        contextIsolation: false,
                        nodeIntegration: false,
                        nodeIntegrationInWorker: false,
                        sandbox: false,
                        webSecurity: true,
                        webviewTag: false,
                        partition: SESSION_PARTITION
                    },
                });

                browserWindow.setSize(1024, 768);
                browserWindow.setPosition(0, 0);

                // browserWindow.maximize();
                // let sz = browserWindow.getSize();
                // const sz0 = sz[0];
                // const sz1 = sz[1];
                // browserWindow.unmaximize();
                // browserWindow.setSize(Math.min(Math.round(sz0 * .75), 1200), Math.min(Math.round(sz1 * .85), 800));
                // // browserWindow.setPosition(Math.round(sz[0] * .10), Math.round(sz[1] * .10));
                // browserWindow.setPosition(Math.round(sz0 * 0.5 - browserWindow.getSize()[0] * 0.5), Math.round(sz1 * 0.5 - browserWindow.getSize()[1] * 0.5));
                // if (showWindow) {
                //     browserWindow.show();
                // }

                browserWindow.webContents.setAudioMuted(true);

                doRun();
            }).catch((err) => {
                console.log(err);
                sender.send("AXE_RUNNER_RUN_", {
                    err: err,
                });
            });
        } else {
            doRun();
        }
    });
}

function startAxeServer(basedir, scripts, scriptContents) {

    return new Promise((resolve, reject) => {

        let scriptsMarkup = "";
        scriptContents.forEach((scriptCode) => {
            scriptsMarkup += `<script data-ace="" type="text/javascript">
            // <![CDATA[
            ${scriptCode}
            // ]]>
            </script>`;
        });
        scripts.forEach((scriptPath) => {
            const filename = path.basename(scriptPath);
            scriptsMarkup += `<script data-ace="" src="/${HTTP_QUERY_PARAM}/${filename}"> </script>`;
        });

        expressApp = express();
        // expressApp.enable('strict routing');

        // expressApp.use("/", (req, res, next) => {
        //     if (LOG_DEBUG) console.log("HTTP: " + req.url);
        //     next();
        // });

        expressApp.use("/", (req, res, next) => {

            for (const scriptPath of scripts) {
                const filename = path.basename(scriptPath);
                if (req.url.endsWith(`${HTTP_QUERY_PARAM}/${filename}`)) {
                    let js = jsCache[scriptPath];
                    if (!js) {
                        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTTP loading ${scriptPath}`);
                        js = fs.readFileSync(scriptPath, { encoding: "utf8" });
                        jsCache[scriptPath] = js;
                    }
                    res.setHeader("Content-Type", "text/javascript");
                    res.send(js);
                    return;
                }
            }

            if (req.query[HTTP_QUERY_PARAM]) {
                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTTP intercept ${req.url}`);

                let html = fs.readFileSync(path.join(basedir, url.parse(req.url).pathname), { encoding: "utf8" });

                if (html.match(/<\/head>/)) {
                    html = html.replace(/<\/head>/, `${scriptsMarkup}</head>`);
                } else if (html.match(/<\/body>/)) {
                    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTML no </head>? (using </body>) ${req.url}`);
                    html = html.replace(/<\/body>/, `${scriptsMarkup}</body>`);
                } else {
                    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTML neither </head> nor </body>?! ${req.url}`);
                }

                res.setHeader("Content-Type", "application/xhtml+xml");
                res.send(html);
                return;
            }

            next();
        });

        // https://expressjs.com/en/4x/api.html#express.static
        const staticOptions = {
            dotfiles: "ignore",
            etag: true,
            // fallthrough: false,
            immutable: true,
            // index: "index.html",
            maxAge: "1d",
            redirect: false,
            // extensions: ["css", "otf"],
            // setHeaders: (res, _path, _stat) => {
            //     //   res.set('x-timestamp', Date.now())
            //     setResponseCORS(res);
            // },
        };
        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} HTTP static path ${basedir}`);
        expressApp.use("/", express.static(basedir, staticOptions));

        const startHttp = function () {
            generateSelfSignedData().then((certData) => {
                httpServer = https.createServer({ key: certData.private, cert: certData.cert }, expressApp).listen(port, () => {
                    const p = httpServer.address().port;

                    port = p;
                    ip = "127.0.0.1";
                    proto = "https";
                    rootUrl = `${proto}://${ip}:${port}`;
                    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} URL ${rootUrl}`);

                    resolve();
                });
            }).catch((err) => {
                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} ${err}`);
                if (LOG_DEBUG) console.log(err);
                httpServer = expressApp.listen(port, () => {
                    const p = httpServer.address().port;

                    port = p;
                    ip = "127.0.0.1";
                    proto = "http";
                    rootUrl = `${proto}://${ip}:${port}`;
                    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} URL ${rootUrl}`);

                    resolve();
                });
            });
        }

        portfinder.getPortPromise().then((p) => {
            port = p;
            startHttp();
        }).catch((err) => {
            debug(err);
            port = 3000;
            startHttp();
        });
    });
}
module.exports = { axeRunnerInitEvents };