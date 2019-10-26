'use strict';

const path = require('path');
const fs = require('fs');
const fsOriginal = require('original-fs');
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

const isDev = process && process.env && (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true');
const showWindow = false;

const LOG_DEBUG_URLS = process.env.LOG_DEBUG_URLS === "1";

const LOG_DEBUG = false;
const ACE_LOG_PREFIX = "[ACE-AXE]";

const SESSION_PARTITION = "persist:axe";

const HTTP_QUERY_PARAM = "AXE_RUNNER";

let expressApp;
let httpServer;
let port;
let ip;
let proto;
let rootUrl;

let httpServerStartWasRequested = false;
let httpServerStarted = false;

let browserWindows = undefined;

const jsCache = {};

let _firstTimeInit = true;

let iHttpReq = 0;

function loadUrl(browserWindow) {
    browserWindow.ace__loadUrlPending = undefined;

    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner LOAD URL ... ${browserWindow.ace__currentUrlOriginal} => ${rootUrl}${browserWindow.ace__currentUrl}`);

    browserWindow.ace__TIME_loadURL = process.hrtime();
    browserWindow.ace__TIME_executeJavaScript = 0;

    if (browserWindow.ace__timeout) {
        clearTimeout(browserWindow.ace__timeout);
    }
    browserWindow.ace__timeout = undefined;
    
    const options = {}; // { extraHeaders: 'pragma: no-cache\n' };
    const uareel = `${rootUrl}${browserWindow.ace__currentUrl}?${HTTP_QUERY_PARAM}=${iHttpReq++}`;
    if (LOG_DEBUG_URLS) {
        console.log("======>>>>>> URL TO LOAD");
        console.log(uareel);
    }
    browserWindow.loadURL(uareel, options);

    const MILLISECONDS_TIMEOUT_INITIAL = 5000; // 5s max to load the window's web contents
    const MILLISECONDS_TIMEOUT_EXTENSION = 35000; // 40s max to load + execute Axe checkers
    const timeoutFunc = () => {
        if (browserWindow.ace__replySent) {
            browserWindow.ace__timeout = undefined;
            browserWindow.ace__timeoutExtended = false;
            return;
        }

        const timeElapsed1 = process.hrtime(browserWindow.ace__TIME_loadURL);
        const timeElapsed2 = browserWindow.ace__TIME_executeJavaScript ? process.hrtime(browserWindow.ace__TIME_executeJavaScript) : [0, 0];

        if (browserWindow.ace__timeoutExtended) {
            browserWindow.ace__replySent = true;
            browserWindow.ace__timeout = undefined;

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner ${MILLISECONDS_TIMEOUT_INITIAL + MILLISECONDS_TIMEOUT_EXTENSION}ms timeout [[FAIL]] (${timeElapsed1[0]} seconds + ${timeElapsed1[1]} nanoseconds) (${timeElapsed2[0]} seconds + ${timeElapsed2[1]} nanoseconds) ${browserWindow.ace__currentUrlOriginal} => ${rootUrl}${browserWindow.ace__currentUrl}`);
            browserWindow.ace__eventEmmitterSender.send("AXE_RUNNER_RUN_", {
                err: `Timeout :( ${MILLISECONDS_TIMEOUT_INITIAL + MILLISECONDS_TIMEOUT_EXTENSION}ms (${timeElapsed1[0]} seconds + ${timeElapsed1[1]} nanoseconds) (${timeElapsed2[0]} seconds + ${timeElapsed2[1]} nanoseconds)`,
                url: browserWindow.ace__currentUrlOriginal
            });
        } else {

            if (!browserWindow.ace__TIME_executeJavaScript) {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner ${MILLISECONDS_TIMEOUT_INITIAL}ms timeout [[RELOAD]] (${timeElapsed1[0]} seconds + ${timeElapsed1[1]} nanoseconds) (${timeElapsed2[0]} seconds + ${timeElapsed2[1]} nanoseconds) ${browserWindow.ace__currentUrlOriginal} => ${rootUrl}${browserWindow.ace__currentUrl}`);
                
                browserWindow.ace__TIME_loadURL = process.hrtime();
                browserWindow.ace__TIME_executeJavaScript = 0;
                browserWindow.webContents.reload();
                browserWindow.ace__timeoutExtended = false;
                browserWindow.ace__timeout = setTimeout(timeoutFunc, MILLISECONDS_TIMEOUT_INITIAL);
                return;
            }
    
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner ${MILLISECONDS_TIMEOUT_INITIAL}ms timeout [[EXTEND]] (${timeElapsed1[0]} seconds + ${timeElapsed1[1]} nanoseconds) (${timeElapsed2[0]} seconds + ${timeElapsed2[1]} nanoseconds) ${browserWindow.ace__currentUrlOriginal} => ${rootUrl}${browserWindow.ace__currentUrl}`);
            
            browserWindow.ace__timeoutExtended = true;
            browserWindow.ace__timeout = setTimeout(timeoutFunc, MILLISECONDS_TIMEOUT_EXTENSION);
        }
    };
    browserWindow.ace__timeoutExtended = false;
    browserWindow.ace__timeout = setTimeout(timeoutFunc, MILLISECONDS_TIMEOUT_INITIAL);
}

function poolCheck() {
    for (const browserWindow of browserWindows) {
        if (browserWindow.ace__loadUrlPending) {
            loadUrl(browserWindow);
        }
    }
}

function axeRunnerInit(eventEmmitter, CONCURRENT_INSTANCES) {
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunnerInit ...`);

    if (!axeRunnerInit.todo) {
        return;
    }
    axeRunnerInit.todo = false;

    const firstTimeInit = _firstTimeInit;
    _firstTimeInit = false;

    browserWindows = [];
    for (let i = 0; i < CONCURRENT_INSTANCES; i++) {

        let browserWindow = new BrowserWindow({
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

        if (typeof browserWindow.webContents.audioMuted !== "undefined") {
            browserWindow.webContents.audioMuted = true;
        } else {
            browserWindow.webContents.setAudioMuted(true);
        }

        browserWindow.ace__poolIndex = browserWindows.length;

        browserWindows.push(browserWindow);
    }

    if (!firstTimeInit) {
        return;
    }

    app.on("certificate-error", (event, webContents, u, error, certificate, callback) => {
        if (u.indexOf(`${rootUrl}/`) === 0) {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert error OKAY ${u}`);
            callback(true);
            return;
        }
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert error FAIL ${u}`);
        callback(false);
    });

    // const filter = { urls: ["*", "*://*/*"] };

    // const onHeadersReceivedCB = (details, callback) => {
    //     if (!details.url) {
    //         callback({});
    //         return;
    //     }

    //     if (details.url.indexOf(`${rootUrl}/`) === 0) {
    //         if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} CSP ${details.url}`);
    //         callback({
    //             // responseHeaders: {
    //             //     ...details.responseHeaders,
    //             //     "Content-Security-Policy":
    //             //         [`default-src 'self' 'unsafe-inline' 'unsafe-eval' data: http: https: ${rootUrl}`],
    //             // },
    //         });
    //     } else {
    //         if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} !CSP ${details.url}`);
    //         callback({});
    //     }
    // };

    const setCertificateVerifyProcCB = (request, callback) => {

        if (request.hostname === ip) {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert verify OKAY ${request.hostname}`);
            callback(0); // OK
            return;
        }
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert verify FALLBACK ${request.hostname}`);
        callback(-3); // Chromium
        // callback(-2); // Fail
    };

    const sess = session.fromPartition(SESSION_PARTITION, { cache: true }); // || session.defaultSession;

    if (sess) {
        // sess.webRequest.onHeadersReceived(filter, onHeadersReceivedCB);
        // sess.webRequest.onBeforeSendHeaders(filter, onBeforeSendHeadersCB);
        sess.setCertificateVerifyProc(setCertificateVerifyProcCB);
    }

    // ipcMain
    eventEmmitter.on('AXE_RUNNER_CLOSE', (event, arg) => {
        // const payload = eventEmmitter.ace_notElectronIpcMainRenderer ? event : arg;
        const sender = eventEmmitter.ace_notElectronIpcMainRenderer ? eventEmmitter : event.sender;

        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner closing ...`);

        axeRunnerInit.todo = true;

        if (browserWindows) {
            if (!(isDev && showWindow)) {
                for (let i = browserWindows.length - 1; i >= 0; i--) {
                    try {
                        browserWindows[i].close();
                    } catch (err) {
                        if (LOG_DEBUG) console.log(err);
                    }
                    browserWindows.splice(0, -1); // remove last
                }
            }
        }
        browserWindows = undefined;

        httpServerStarted = false;
        httpServerStartWasRequested = false;

        if (httpServer) {
            httpServer.close();
            httpServer = undefined;
        }

        let _timeOutID = setTimeout(() => {
            _timeOutID = undefined;
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} xxxx axeRunner timeout.`);
            closed();
        }, 3000);

        let _closed = false;
        function closed() {
            if (_timeOutID) {
                clearTimeout(_timeOutID);
                _timeOutID = undefined;
            }
            if (_closed) {
                return;
            }
            _closed = true;

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner sending closed event ...`);
            sender.send("AXE_RUNNER_CLOSE_", {
                ok: true
            });
        }
        let _done = 0;
        function done() {
            _done++;
            if (_done === 2) {
                closed();
            }
        }

        const sess = session.fromPartition(SESSION_PARTITION, { cache: true }); // || session.defaultSession;
        if (sess) {
            setTimeout(async () => {
                try {
                    sess.clearCache();
                } catch (err) {
                    if (LOG_DEBUG) console.log(err);
                }
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} session cache cleared`);
                done();

                try {
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
                            // "localstorage", BLOCKS!?
                            "shadercache",
                            "websql",
                            "serviceworkers",
                        ],
                    });
                } catch (err) {
                    if (LOG_DEBUG) console.log(err);
                }
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} session storage cleared`);
                done();
            }, 0);
        }
    });

    // ipcMain
    eventEmmitter.on('AXE_RUNNER_RUN', (event, arg) => {

        const payload = eventEmmitter.ace_notElectronIpcMainRenderer ? event : arg;
        const sender = eventEmmitter.ace_notElectronIpcMainRenderer ? eventEmmitter : event.sender;

        const basedir = payload.basedir;
        const uarel = payload.url;
        const scripts = payload.scripts;
        const scriptContents = payload.scriptContents;

        if (LOG_DEBUG_URLS) {
            console.log("######## URL 1");
            console.log(uarel);
        }
        // windows! file://C:\aa\bb\chapter.xhtml
        const uarelObj = url.parse(uarel.replace(/\\/g, "/"));
        const windowsDrive = uarelObj.hostname ? `${uarelObj.hostname.toUpperCase()}:` : "";
        if (LOG_DEBUG_URLS) {
            console.log("######## URL 2");
            console.log(windowsDrive);
        }
        const bd = basedir.replace(/\\/g, "/");
        if (LOG_DEBUG_URLS) {
            console.log("######## URL 3");
            console.log(uarelObj.pathname);
        }
        const full = (windowsDrive + decodeURI(uarelObj.pathname));
        if (LOG_DEBUG_URLS) {
            console.log("######## URL 4");
            console.log(full);
        }
        let httpUrl = full.replace(bd, "");
        if (LOG_DEBUG_URLS) {
            console.log("######## URL 5");
            console.log(httpUrl);
        }
        httpUrl = encodeURI(httpUrl);
        if (LOG_DEBUG_URLS) {
            console.log("######## URL 6");
            console.log(httpUrl);
        }
 
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner running ... ${basedir} --- ${uarel} => ${httpUrl}`);

        function poolPush() {

            const browserWindow = browserWindows.find((bw) => {
                if (!bw.ace__loadUrlPending &&
                    (!bw.ace__currentUrl || (bw.ace__currentUrl && bw.ace__replySent))) {
                    return bw;
                }
                return undefined;
            });

            if (!browserWindow) {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner xxxxx no free browser window in pool?! ${uarel} --- ${httpUrl}`);
                setTimeout(() => {
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner xxxxx trying another free browser window in pool ... ${uarel} --- ${httpUrl}`);
                    poolPush();
                }, 1000);
                return;
            }

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner free browser window in pool: ${browserWindow.ace__poolIndex}`);

            browserWindow.ace__eventEmmitterSender = sender;
            browserWindow.ace__replySent = false;
            browserWindow.ace__timeout = undefined;
            browserWindow.ace__previousUrl = browserWindow.ace__currentUrl;
            browserWindow.ace__currentUrlOriginal = uarel;
            browserWindow.ace__currentUrl = httpUrl;

            browserWindow.webContents.once("did-start-loading", () => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-start-loading ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
            });
            // browserWindow.webContents.once("did-stop-loading", () => {
            //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-stop-loading ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
            // });
            browserWindow.webContents.once("did-fail-load", (event, errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId) => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-fail-load ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                if (LOG_DEBUG) console.log(`${errorCode} - ${errorDescription} - ${validatedURL} - ${isMainFrame} - ${frameProcessId} - ${frameRoutingId}`);
                // https://cs.chromium.org/chromium/src/net/base/net_error_list.h

                if (browserWindow.ace__replySent) {
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner WAS TIMEOUT! ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                    return;
                }

                browserWindow.ace__replySent = true;
                if (browserWindow.ace__timeout) {
                    clearTimeout(browserWindow.ace__timeout);
                }
                browserWindow.ace__timeout = undefined;

                browserWindow.ace__eventEmmitterSender.send("AXE_RUNNER_RUN_", {
                    err: `did-fail-load: ${errorCode} - ${errorDescription} - ${validatedURL} - ${isMainFrame} - ${frameProcessId} - ${frameRoutingId}`,
                    url: browserWindow.ace__currentUrlOriginal
                });
            });
            // browserWindow.webContents.once("dom-ready", () => { // occurs early
            //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner dom-ready ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
            // });
            browserWindow.webContents.once("did-finish-load", () => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-finish-load ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);

                browserWindow.ace__TIME_executeJavaScript = process.hrtime();

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
                        const timeElapsed = process.hrtime(browserWindow.ace__TIME_executeJavaScript);
                
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner done. (${timeElapsed[0]} seconds + ${timeElapsed[1]} nanoseconds) ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                        // if (LOG_DEBUG) console.log(ok);
                        if (browserWindow.ace__replySent) {
                            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner WAS TIMEOUT! ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                            return;
                        }

                        browserWindow.ace__replySent = true;
                        if (browserWindow.ace__timeout) {
                            clearTimeout(browserWindow.ace__timeout);
                        }
                        browserWindow.ace__timeout = undefined;

                        browserWindow.ace__eventEmmitterSender.send("AXE_RUNNER_RUN_", {
                            ok,
                            url: browserWindow.ace__currentUrlOriginal
                        });
                    })
                    .catch((err) => {
                        const timeElapsed = process.hrtime(browserWindow.ace__TIME_executeJavaScript);

                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner fail! (${timeElapsed[0]} seconds + ${timeElapsed[1]} nanoseconds) ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                        if (LOG_DEBUG) console.log(err);
                        if (browserWindow.ace__replySent) {
                            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner WAS TIMEOUT! ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                            return;
                        }

                        browserWindow.ace__replySent = true;
                        if (browserWindow.ace__timeout) {
                            clearTimeout(browserWindow.ace__timeout);
                        }
                        browserWindow.ace__timeout = undefined;

                        browserWindow.ace__eventEmmitterSender.send("AXE_RUNNER_RUN_", {
                            err,
                            url: browserWindow.ace__currentUrlOriginal
                        });
                    });
            });

            if (httpServerStarted) {
                loadUrl(browserWindow);
            } else {
                browserWindow.ace__loadUrlPending = httpUrl;
            }
        }

        if (!httpServerStartWasRequested) { // lazy init
            httpServerStartWasRequested = true;

            poolPush();

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner starting server ...`);

            startAxeServer(basedir, scripts, scriptContents).then(() => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner server started`);
                httpServerStarted = true;

                poolCheck();
            }).catch((err) => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner server error`);
                console.log(err);
                browserWindow.ace__eventEmmitterSender.send("AXE_RUNNER_RUN_", {
                    err,
                    url: browserWindow.ace__currentUrlOriginal
                });
            });
        } else {
            poolPush();
        }
    });
}
axeRunnerInit.todo = true;

const filePathsExpressStaticNotExist = {};
function startAxeServer(basedir, scripts, scriptContents) {

    return new Promise((resolve, reject) => {

        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner startAxeServer...`);

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

        expressApp.basedir = basedir;
        expressApp.use("/", (req, res, next) => {

            for (const scriptPath of scripts) {
                const filename = path.basename(scriptPath);
                if (req.url.endsWith(`${HTTP_QUERY_PARAM}/${filename}`)) {
                    let js = jsCache[scriptPath];
                    if (!js) {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTP loading ${scriptPath}`);
                        js = fs.readFileSync(scriptPath, { encoding: "utf8" });
                        // if (LOG_DEBUG) console.log(js);
                        jsCache[scriptPath] = js;
                    } else {
                        // if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTP already loaded ${scriptPath}`);
                    }
                    res.setHeader("Content-Type", "text/javascript");
                    res.send(js);
                    return;
                }
            }

            if (req.query[HTTP_QUERY_PARAM]) {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTP intercept ${req.url}`);

                if (LOG_DEBUG_URLS) {
                    console.log(">>>>>>>>>> URL 1");
                    console.log(req.url);
                }
                const ptn = url.parse(req.url).pathname;
                if (LOG_DEBUG_URLS) {
                    console.log(">>>>>>>>>> URL 2");
                    console.log(ptn);
                }
                const pn = decodeURI(ptn);
                if (LOG_DEBUG_URLS) {
                    console.log(">>>>>>>>>> URL 3");
                    console.log(pn);
                }
                let fileSystemPath = path.join(expressApp.basedir, pn);
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} filepath to read: ${fileSystemPath}`);
                if (!fs.existsSync(fileSystemPath)) {
                    fileSystemPath = pn;
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} filepath to read (corrected): ${fileSystemPath}`);
                }

                let html = fs.readFileSync(fileSystemPath, { encoding: "utf8" });
                // if (LOG_DEBUG) console.log(html);

                if (html.match(/<\/head>/)) {
                    html = html.replace(/<\/head>/, `${scriptsMarkup}</head>`);
                } else if (html.match(/<\/body>/)) {
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTML no </head>? (using </body>) ${req.url}`);
                    html = html.replace(/<\/body>/, `${scriptsMarkup}</body>`);
                } else {
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTML neither </head> nor </body>?! ${req.url}`);
                }

                res.setHeader("Content-Type", "application/xhtml+xml");
                res.send(html);
                return;
            }

            next();
        });
        
        if (isDev) { // handle WebInspector JS maps etc.
            expressApp.use("/", (req, res, next) => {
                // const url = new URL(`https://fake.org${req.url}`);
                // const pathname = url.pathname;
                const pathname = decodeURI(url.parse(req.url).pathname);

                const filePath = path.join(basedir, pathname);
                if (filePathsExpressStaticNotExist[filePath]) {
                    res.status(404).send(filePathsExpressStaticNotExist[filePath]);
                    return;
                }
                fsOriginal.exists(filePath, (exists) => {
                    if (exists) {
                        fsOriginal.readFile(filePath, undefined, (err, data) => {
                            if (err) {
                                if (LOG_DEBUG) {
                                    console.log(`${ACE_LOG_PREFIX} HTTP FAIL fsOriginal.exists && ERR ${basedir} + ${req.url} => ${filePath}`, err);
                                }
                                filePathsExpressStaticNotExist[filePath] = err.toString();
                                res.status(404).send(filePathsExpressStaticNotExist[filePath]);
                            } else {
                                // if (LOG_DEBUG) {
                                //     console.log(`${ACE_LOG_PREFIX} HTTP OK fsOriginal.exists ${basedir} + ${req.url} => ${filePath}`);
                                // }
                                next();
                                // res.send(data);
                            }
                        });
                    } else {
                        fs.exists(filePath, (exists) => {
                            if (exists) {
                                fs.readFile(filePath, undefined, (err, data) => {
                                    if (err) {
                                        if (LOG_DEBUG) {
                                            console.log(`${ACE_LOG_PREFIX} HTTP FAIL !fsOriginal.exists && fs.exists && ERR ${basedir} + ${req.url} => ${filePath}`, err);
                                        }
                                        filePathsExpressStaticNotExist[filePath] = err.toString();
                                        res.status(404).send(filePathsExpressStaticNotExist[filePath]);
                                    } else {
                                        if (LOG_DEBUG) {
                                            console.log(`${ACE_LOG_PREFIX} HTTP OK !fsOriginal.exists && fs.exists ${basedir} + ${req.url} => ${filePath}`);
                                        }
                                        next();
                                        // res.send(data);
                                    }
                                });
                            } else {
                                if (LOG_DEBUG) {
                                    console.log(`${ACE_LOG_PREFIX} HTTP FAIL !fsOriginal.exists && !fs.exists ${basedir} + ${req.url} => ${filePath}`);
                                }
                                res.status(404).end();
                            }
                        });
                    }
                });
            });
        }

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
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTP static path ${basedir}`);
        expressApp.use("/", express.static(basedir, staticOptions));

        const startHttp = function () {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner generateSelfSignedData...`);
            generateSelfSignedData().then((certData) => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner generateSelfSignedData OK.`);

                httpServer = https.createServer({ key: certData.private, cert: certData.cert }, expressApp).listen(port, () => {
                    const p = httpServer.address().port;

                    port = p;
                    ip = "127.0.0.1";
                    proto = "https";
                    rootUrl = `${proto}://${ip}:${port}`;
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} server URL ${rootUrl}`);

                    resolve();
                });
            }).catch((err) => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} generateSelfSignedData error!`);
                if (LOG_DEBUG) console.log(err);
                httpServer = expressApp.listen(port, () => {
                    const p = httpServer.address().port;

                    port = p;
                    ip = "127.0.0.1";
                    proto = "http";
                    rootUrl = `${proto}://${ip}:${port}`;
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} server URL ${rootUrl}`);

                    resolve();
                });
            });
        }

        portfinder.getPortPromise().then((p) => {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner HTTP port ${p}`);
            port = p;
            startHttp();
        }).catch((err) => {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner HTTP port error!`);
            console.log(err);
            port = 3000;
            startHttp();
        });
    });
}

function prepareLaunch(eventEmmitter, CONCURRENT_INSTANCES) {
    eventEmmitter.on('AXE_RUNNER_LAUNCH', (event, arg) => {
        // const payload = eventEmmitter.ace_notElectronIpcMainRenderer ? event : arg;
        const sender = eventEmmitter.ace_notElectronIpcMainRenderer ? eventEmmitter : event.sender;
    
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner AXE_RUNNER_LAUNCH ...`);
    
        axeRunnerInit(eventEmmitter, CONCURRENT_INSTANCES);
    
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner sending launched event ...`);
        sender.send("AXE_RUNNER_LAUNCH_", {
            ok: true
        });
    });
}
module.exports = { prepareLaunch };