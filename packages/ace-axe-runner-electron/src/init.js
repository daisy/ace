'use strict';

// TOO LATE FOR JEST RUNNER DUE TO AFTER ELECTRON APP.READY!
// (see package.json patcher script "patchElectronJestRunner3")
// // NO_HTTP_ADD
// const electron = require('electron');
// const protocol = electron.protocol;
// const ACE_ELECTRON_HTTP_PROTOCOL = "acehttps";
// // app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
// protocol.registerSchemesAsPrivileged([{
//     privileges: {
//         allowServiceWorkers: false,
//         bypassCSP: false,
//         corsEnabled: true,
//         secure: true,
//         standard: true,
//         stream: true,
//         supportFetchAPI: true,
//     },
//     scheme: ACE_ELECTRON_HTTP_PROTOCOL,
// }]);

const mime = require('mime-types');

const nodeStream = require('stream');

const path = require('path');
const fs = require('fs');

const electron = require('electron');
const app = electron.app;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;
// const webContents = electron.webContents;
// const ipcMain = electron.ipcMain;

const fsOriginal = require('original-fs');

const isDev = process && process.env && (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true');
const showWindow = false;

let cliOption_MILLISECONDS_TIMEOUT_EXTENSION = undefined;

const LOG_DEBUG_URLS = process.env.LOG_DEBUG_URLS === "1";

const LOG_DEBUG = false;
const ACE_LOG_PREFIX = "[ACE-AXE]";

const SESSION_PARTITION = "persist:axe";

const HTTP_QUERY_PARAM = "AXE_RUNNER";

const ACE_ELECTRON_HTTP_PROTOCOL = "acehttps";

// NO_HTTP_REMOVE
// const express = require('express');
// const portfinder = requir_e('portfinder');
// // const http = require('http');
// const https = require('https');
// const generateSelfSignedData = requir_e('./selfsigned').generateSelfSignedData;
// let expressApp;
// let httpServer;
// let port;
// let ip;
// let proto;
// let rootUrl;
let httpServerStartWasRequested = false;
let httpServerStarted = false;

if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner ELECTRON MODULE INSTANCE`);

// NO_HTTP_ADD
const rootUrl = `${ACE_ELECTRON_HTTP_PROTOCOL}://0.0.0.0`;

let browserWindows = undefined;

const jsCache = {};

let _firstTimeInit = true;

let iHttpReq = 0;

// NO_HTTP_ADD
class BufferReadableStream extends nodeStream.Readable {
    constructor(buffer) {
        super();
        this.buffer = buffer;
        this.alreadyRead = 0;
    }
    _read(size) {
        if (this.alreadyRead >= this.buffer.length) {
            this.push(null);
            return;
        }

        let chunk = this.alreadyRead ?
            this.buffer.slice(this.alreadyRead) :
            this.buffer;

        if (size) {
            let l = size;
            if (size > chunk.length) {
                l = chunk.length;
            }

            chunk = chunk.slice(0, l);
        }

        this.alreadyRead += chunk.length;
        this.push(chunk);
    }
}
function bufferToStream(buffer) {
    return new BufferReadableStream(buffer);
}

let _streamProtocolHandler = undefined;
const streamProtocolHandler = async (
    req,
    callback) => {

    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} streamProtocolHandler req.url: ${req.url}`);
    const u = new URL(req.url);

    if (LOG_DEBUG) {
        Object.keys(req.headers).forEach((header) => {
            const val = req.headers[header];

            console.log(`${ACE_LOG_PREFIX} streamProtocolHandler req.header: ${header} => ${val}`);

            // if (val) {
            //     headers[header] = val;
            // }
        });
    }

    let ref = u.origin;
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} streamProtocolHandler u.origin: ${ref}`);
    if (req.referrer && req.referrer.trim()) {
        ref = req.referrer;
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} streamProtocolHandler req.referrer: ${ref}`);
    }

    const headers = {};

    if (ref && ref !== "null" && !/^https?:\/\/localhost.+/.test(ref) && !/^https?:\/\/127\.0\.0\.1.+/.test(ref)) {
        headers.referer = ref;
    } else {
        headers.referer = `${ACE_ELECTRON_HTTP_PROTOCOL}://0.0.0.0/`;
    }

    // CORS everything!
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "GET, HEAD, OPTIONS"; // POST, DELETE, PUT, PATCH
    // tslint:disable-next-line:max-line-length
    headers["Access-Control-Allow-Headers"] = "Content-Type, Content-Length, Accept-Ranges, Content-Range, Range, Link, Transfer-Encoding, X-Requested-With, Authorization, Accept, Origin, User-Agent, DNT, Cache-Control, Keep-Alive, If-Modified-Since";
    // tslint:disable-next-line:max-line-length
    headers["Access-Control-Expose-Headers"] = "Content-Type, Content-Length, Accept-Ranges, Content-Range, Range, Link, Transfer-Encoding, X-Requested-With, Authorization, Accept, Origin, User-Agent, DNT, Cache-Control, Keep-Alive, If-Modified-Since";

    if (!_streamProtocolHandler) {
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} !? _streamProtocolHandler`);

        const buff = Buffer.from("<html><body><p>Internal Server Error</p><p>!_streamProtocolHandler</p></body></html>");
        headers["Content-Length"] = buff.length.toString();
        headers["Content-Type"] = "text/html";
        callback({
            data: bufferToStream(buff),
            headers,
            statusCode: 500,
        });
        return;
    }
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} BEFORE _streamProtocolHandler ${req.url}`);
    await _streamProtocolHandler(req, callback, headers);
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} AFTER _streamProtocolHandler ${req.url}`);
};
app.whenReady().then(async () => {
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} Electron app ready`);

    // try {
    //     await clearSessions();
    // } catch (err) {
    //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} clearSessions fail?`);
    // }

    // if (session.defaultSession) {
    //     session.defaultSession.protocol.registerStreamProtocol(
    //         ACE_ELECTRON_HTTP_PROTOCOL,
    //         streamProtocolHandler);
    // }
    const sess = session.fromPartition(SESSION_PARTITION, { cache: true });
    if (sess) {
        sess.protocol.registerStreamProtocol(
            ACE_ELECTRON_HTTP_PROTOCOL,
            streamProtocolHandler);

        sess.setPermissionRequestHandler((wc, permission, callback) => {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} setPermissionRequestHandler ${wc.getURL()} => ${permission}`);
            callback(true);
        });
    }
});

function loadUrl(browserWindow) {
    browserWindow.ace__loadUrlPending = undefined;

    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner LOAD URL ... ${browserWindow.ace__currentUrlOriginal} => ${rootUrl}${browserWindow.ace__currentUrl}`);

    browserWindow.ace__TIME_loadURL_ELLAPSED = undefined;
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

    try {
        browserWindow.loadURL(uareel, options);
    } catch (ex) {
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner failed loadURL??! ${browserWindow.ace__currentUrlOriginal} => ${rootUrl}${browserWindow.ace__currentUrl}`);
        browserWindow.ace__replySent = true;
        browserWindow.ace__timeout = undefined;
        browserWindow.ace__timeoutExtended = false;
        return;
    }

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
    const MILLISECONDS_TIMEOUT_INITIAL = _MILLISECONDS_TIMEOUT_INITIAL || 5000; // 5s check to load the browser window web contents + execute Axe checkers
    const MILLISECONDS_TIMEOUT_EXTENSION = cliOption_MILLISECONDS_TIMEOUT_EXTENSION || _MILLISECONDS_TIMEOUT_EXTENSION || 240000; // 240s (4mn) extension (window contents usually loads fast, but Axe runtime takes time...)

    const timeoutFunc = () => {
        if (browserWindow.ace__replySent) {
            browserWindow.ace__timeout = undefined;
            browserWindow.ace__timeoutExtended = false;
            return;
        }

        const timeElapsed1 = browserWindow.ace__TIME_loadURL_ELLAPSED || (browserWindow.ace__TIME_loadURL_ELLAPSED = process.hrtime(browserWindow.ace__TIME_loadURL));
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

                browserWindow.ace__TIME_loadURL_ELLAPSED = undefined;
                browserWindow.ace__TIME_loadURL = process.hrtime();
                browserWindow.ace__TIME_executeJavaScript = 0;
                try {
                    browserWindow.webContents.reload();
                } catch (ex) {
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner failed [[RELOAD]] ${browserWindow.ace__currentUrlOriginal} => ${rootUrl}${browserWindow.ace__currentUrl}`);
                    // TODO: a better way to detect stale Electron BrowserWindows?
                    // this can happen is a single document in the window pool triggered a total abort
                    // ... then pending timeouts wake up, only to find that the windows have been closed.
                    browserWindow.ace__replySent = true;
                    browserWindow.ace__timeout = undefined;
                    browserWindow.ace__timeoutExtended = false;
                    return;
                }
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

    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunnerInit TODO ...`);

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
                backgroundThrottling: false,
                contextIsolation: false,
                nodeIntegration: false,
                nodeIntegrationInWorker: false,
                sandbox: false,
                webSecurity: true,
                webviewTag: false,
                enableRemoteModule: false,
                partition: SESSION_PARTITION,
                // (electron) Deprecation Warning: Disabling nativeWindowOpen is deprecated. The nativeWindowOpen option will be removed in Electron 18.
                // nativeWindowOpen: false, // The default of nativeWindowOpen is deprecated and will be changing from false to true in Electron 15. See https://github.com/electron/electron/issues/28511
            },
        });

        browserWindow.setSize(1024, 768);
        browserWindow.setPosition(0, 0);

        browserWindow.webContents.session.webRequest.onBeforeRequest({
            urls: [],
        }, (details, callback) => {
            if (details.url
                &&
                (
                /^file:\/\//.test(details.url)
                ||
                /^https?:\/\//.test(details.url)
                // && (
                //     (rootUrl && !details.url.startsWith(rootUrl))
                //     ||
                //     (!rootUrl && !/^https?:\/\/127.0.0.1/.test(details.url))
                //    )
                )
            ) {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} onBeforeRequest BLOCK: ${details.url} (${rootUrl})`);

                // causes ERR_BLOCKED_BY_CLIENT -20 did-fail-load
                callback({
                    cancel: true,
                    // redirectURL: "about:blank",
                });
                return;
            }

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} onBeforeRequest OKAY: ${details.url}`);
            callback({ cancel: false });
          });

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

    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunnerInit firstTimeInit ...`);

    // NO_HTTP_REMOVE
    // app.on("certificate-error", (event, webContents, u, error, certificate, callback) => {
    //     if (u.indexOf(`${rootUrl}/`) === 0) {
    //         if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert error OKAY ${u}`);
    //         callback(true);
    //         return;
    //     }
    //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert error FAIL ${u}`);
    //     callback(false);
    // });

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

    // NO_HTTP_REMOVE
    // const setCertificateVerifyProcCB = (request, callback) => {
    //     if (request.hostname === ip) {
    //         if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert verify OKAY ${request.hostname}`);
    //         callback(0); // OK
    //         return;
    //     }
    //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTPS cert verify FALLBACK ${request.hostname}`);
    //     callback(-3); // Chromium
    //     // callback(-2); // Fail
    // };
    // const sess = session.fromPartition(SESSION_PARTITION, { cache: true }); // || session.defaultSession;
    // if (sess) {
    //     // sess.webRequest.onHeadersReceived(filter, onHeadersReceivedCB);
    //     // sess.webRequest.onBeforeSendHeaders(filter, onBeforeSendHeadersCB);
    //     sess.setCertificateVerifyProc(setCertificateVerifyProcCB);
    // }

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

        // NO_HTTP_ADD
        _streamProtocolHandler = undefined;

        httpServerStarted = false;
        httpServerStartWasRequested = false;

        // NO_HTTP_REMOVE
        // if (httpServer) {
        //     httpServer.close();
        //     httpServer = undefined;
        // }

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

        // clearSessions()
        const sess = session.fromPartition(SESSION_PARTITION, { cache: true }); // || session.defaultSession;
        if (sess) {
            setTimeout(async () => {
                try {
                    await sess.clearCache();
                } catch (err) {
                    if (LOG_DEBUG) console.log(err);
                }
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} session cache cleared`);
                done();

                try {
                    await sess.clearStorageData({
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
                            // "websql",
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
        cliOption_MILLISECONDS_TIMEOUT_EXTENSION = payload.cliOption_MILLISECONDS_TIMEOUT_EXTENSION;

        if (LOG_DEBUG_URLS) {
            console.log("######## URL 1");
            console.log(uarel);
        }
        // windows! file://C:\aa\bb\chapter.xhtml

        const uarelObj = new URL(uarel.replace(/\\/g, "/"));
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
        const full = (windowsDrive + decodeURIComponent(uarelObj.pathname));
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

            browserWindow.ace__eventEmmitterSender = sender;
            browserWindow.ace__replySent = false;
            browserWindow.ace__timeout = undefined;
            browserWindow.ace__previousUrl = browserWindow.ace__currentUrl;
            browserWindow.ace__currentUrlOriginal = uarel;
            browserWindow.ace__currentUrl = httpUrl;

            if (LOG_DEBUG) console.log(`\n\n${ACE_LOG_PREFIX} axeRunner free browser window in pool: ${browserWindow.ace__poolIndex} ${browserWindow.ace__previousUrl} ${browserWindow.ace__currentUrlOriginal} ${browserWindow.ace__currentUrl}\n\n`);

            browserWindow.webContents.once("did-start-loading", () => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-start-loading ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
            });
            // browserWindow.webContents.once("did-stop-loading", () => {
            //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-stop-loading ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
            // });
            const didFailLoadHandler = (event, errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId) => {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-fail-load ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`, "\n", `${errorCode} - ${errorDescription} - ${validatedURL} - ${isMainFrame} - ${frameProcessId} - ${frameRoutingId}`);

                // https://cs.chromium.org/chromium/src/net/base/net_error_list.h
                if (errorCode == -20) { // ERR_BLOCKED_BY_CLIENT
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner ERR_BLOCKED_BY_CLIENT (ignore) ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                    return;
                }

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
            };
            browserWindow.webContents.once("did-fail-load", didFailLoadHandler);
            // browserWindow.webContents.once("dom-ready", () => { // occurs early
            //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner dom-ready ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
            // });
            browserWindow.webContents.once("did-finish-load", () => {
                // browserWindow.webContents.setMaxListeners(11+) ?
                // (node:5505) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 did-fail-load listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
                browserWindow.webContents.removeListener("did-fail-load", didFailLoadHandler);

                browserWindow.ace__TIME_loadURL_ELLAPSED = process.hrtime(browserWindow.ace__TIME_loadURL);

                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did-finish-load (${browserWindow.ace__TIME_loadURL_ELLAPSED[0]} seconds + ${browserWindow.ace__TIME_loadURL_ELLAPSED[1]} nanoseconds) ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);

                browserWindow.ace__TIME_executeJavaScript = process.hrtime();

                const js = `
new Promise((resolve, reject) => {
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
}).then(res => res).catch(err => { throw err; });
`;
                browserWindow.webContents.executeJavaScript(js, true)
                    .then((ok) => {
                        const timeElapsed = process.hrtime(browserWindow.ace__TIME_executeJavaScript);

                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner done. (${timeElapsed[0]} seconds + ${timeElapsed[1]} nanoseconds) ${browserWindow.ace__poolIndex} ${browserWindow.ace__currentUrlOriginal} --- ${browserWindow.ace__currentUrl}`);
                        // if (LOG_DEBUG && ok.axe.violations.length) console.log(ok.axe.url, JSON.stringify(ok, null, 4));
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
        } // poolPush()

        if (!httpServerStartWasRequested) { // lazy init
            httpServerStartWasRequested = true;

            poolPush();

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner starting server ...`);

            // NO_HTTP_ADD
            try {
                startAxeServer(basedir, scripts, scriptContents);
            } catch (err) {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner server error`);
                console.log(err);
                browserWindow.ace__eventEmmitterSender.send("AXE_RUNNER_RUN_", {
                    err,
                    url: browserWindow.ace__currentUrlOriginal
                });
                return;
            }

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner server started`);
            httpServerStarted = true;
            poolCheck();

            // NO_HTTP_REMOVE
            // startAxeServer(basedir, scripts, scriptContents).then(() => {
            //     // ...
            //     httpServerStarted = true;
            // }).catch((err) => {
            //     // ...
            // });
        } else {
            poolPush();
        }
    });
}
axeRunnerInit.todo = true;

// const filePathsExpressStaticNotExist = {};
function startAxeServer(basedir, scripts, scriptContents) {

    // NO_HTTP_REMOVE
    // return new Promise((resolve, reject) => {

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

        // NO_HTTP_ADD
        _streamProtocolHandler = async (
            req,
            callback,
            headers) => {
            const u = new URL(req.url);

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
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTP already loaded ${scriptPath}`);
                    }
                    const buff = Buffer.from(js);
                    headers["Content-Length"] = buff.length.toString();
                    headers["Content-Type"] = "text/javascript";
                    callback({
                        data: bufferToStream(buff),
                        headers,
                        statusCode: 200,
                    });
                    return;
                }
            }

            const queryParam = u.searchParams.get(HTTP_QUERY_PARAM) || undefined;
            if (queryParam) {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTP intercept ${req.url}`);

                if (LOG_DEBUG_URLS) {
                    console.log(">>>>>>>>>> URL 1");
                    console.log(req.url);
                }
                const ptn = u.pathname;
                if (LOG_DEBUG_URLS) {
                    console.log(">>>>>>>>>> URL 2");
                    console.log(ptn);
                }
                const pn = decodeURIComponent(ptn);
                if (LOG_DEBUG_URLS) {
                    console.log(">>>>>>>>>> URL 3");
                    console.log(pn);
                }

                let fileSystemPath = path.join(basedir, pn);
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} filepath to read: ${fileSystemPath}`);
                if (!fs.existsSync(fileSystemPath)) {
                    // fileSystemPath = pn;
                    // if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} filepath to read (corrected): ${fileSystemPath}`);
                    // if (!fs.existsSync(fileSystemPath)) {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} FILE DOES NOT EXIST!! ${fileSystemPath}`);

                        const buff = Buffer.from(`<html><body><p>Internal Server Error</p><p>404?! ${fileSystemPath}</p></body></html>`);
                        headers["Content-Length"] = buff.length.toString();
                        headers["Content-Type"] = "text/html";
                        callback({
                            data: bufferToStream(buff),
                            headers,
                            statusCode: 404,
                        });
                        return;
                    // }
                }

                // let html = fs.readFileSync(fileSystemPath, { encoding: "utf8" });
                fs.readFile(fileSystemPath, { encoding: "utf8" }, (err, html) => {
                    if (err) {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTML file load??! ${req.url}`);
                        callback({
                            data: null,
                            headers,
                            statusCode: 404,
                        });
                        return;
                    }

                    // if (LOG_DEBUG) console.log(html);

                    if (html.match(/<\/head>/)) {
                        html = html.replace(/<\/head>/, `${scriptsMarkup}</head>`);
                    } else if (html.match(/<\/body>/)) {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTML no </head>? (using </body>) ${req.url}`);
                        html = html.replace(/<\/body>/, `${scriptsMarkup}</body>`);
                    } else {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTML neither </head> nor </body>?! ${req.url}`);
                    }

                    const buff = Buffer.from(html);
                    headers["Content-Length"] = buff.length.toString();
                    headers["Content-Type"] = "application/xhtml+xml";
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} CALLBACK HEADERS ${req.url} ${JSON.stringify(headers)}`);
                    callback({
                        data: bufferToStream(buff),
                        headers,
                        statusCode: 200,
                    });
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} POST-CALLBACK ${req.url}`);
                });
                return;
            }

            // equivalent to Express static:

            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} Express static emulate: ${req.url}`);

            if (LOG_DEBUG_URLS) {
                console.log(">>>>>>>>>>- URL 1");
                console.log(req.url);
            }
            const ptn = u.pathname;
            if (LOG_DEBUG_URLS) {
                console.log(">>>>>>>>>>- URL 2");
                console.log(ptn);
            }
            const pn = decodeURIComponent(ptn);
            if (LOG_DEBUG_URLS) {
                console.log(">>>>>>>>>>- URL 3");
                console.log(pn);
            }
            let fileSystemPath = path.join(basedir, pn);
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} --filepath to read: ${fileSystemPath}`);
            if (!fs.existsSync(fileSystemPath)) {
                // fileSystemPath = pn;
                // if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} --filepath to read (corrected): ${fileSystemPath}`);
                // if (!fs.existsSync(fileSystemPath)) {
                    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} --FILE DOES NOT EXIST!! ${fileSystemPath}`);

                    const buff = Buffer.from(`<html><body><p>Internal Server Error</p><p>404?! ${fileSystemPath}</p></body></html>`);
                    headers["Content-Length"] = buff.length.toString();
                    headers["Content-Type"] = "text/html";
                    callback({
                        data: bufferToStream(buff),
                        headers,
                        statusCode: 404,
                    });
                    return;
                // }
            }
            try {
                let mediaType = mime.lookup(fileSystemPath) || "stream/octet";
                const stats = fs.statSync(fileSystemPath);
                headers["Content-Length"] = stats.size;
                headers["Content-Type"] = mediaType;
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} --CALLBACK HEADERS ${req.url} ${JSON.stringify(headers)}`);
                const steam = fs.createReadStream(fileSystemPath);
                callback({
                    data: steam,
                    headers,
                    statusCode: 200,
                });
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} --POST-CALLBACK ${req.url}`);
            } catch (fsErr) {
                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} --fsErr ${fsErr}`);

                const buff = Buffer.from(`<html><body><p>Internal Server Error</p><p>fsErr: ${fsErr}</p></body></html>`);
                headers["Content-Length"] = buff.length.toString();
                headers["Content-Type"] = "text/html";
                callback({
                    data: bufferToStream(buff),
                    headers,
                    statusCode: 500,
                });
            }

            // if (isDev) { // handle WebInspector JS maps etc.

            //     // const url = new URL(`https://fake.org${req.url}`);
            //     // const pathname = url.pathname;
            //     const pathname = decodeURIComponent(u.pathname);

            //     const filePath = path.join(basedir, pathname);
            //     if (filePathsExpressStaticNotExist[filePath]) {

            //         const buff = Buffer.from(filePathsExpressStaticNotExist[filePath]);
            //         headers["Content-Length"] = buff.length.toString();
            //         headers["Content-Type"] = "plain/text";
            //         callback({
            //             data: bufferToStream(buff),
            //             headers,
            //             statusCode: 404,
            //         });
            //         return;
            //     }
            //     fsOriginal.exists(filePath, (exists) => {
            //         if (exists) {
            //             fsOriginal.readFile(filePath, undefined, (err, data) => {
            //                 if (err) {
            //                     if (LOG_DEBUG) {
            //                         console.log(`${ACE_LOG_PREFIX} HTTP FAIL fsOriginal.exists && ERR ${basedir} + ${req.url} => ${filePath}`, err);
            //                     }
            //                     filePathsExpressStaticNotExist[filePath] = err.toString();
            //                     const buff = Buffer.from(filePathsExpressStaticNotExist[filePath]);
            //                     headers["Content-Length"] = buff.length.toString();
            //                     headers["Content-Type"] = "plain/text";
            //                     callback({
            //                         data: bufferToStream(buff),
            //                         headers,
            //                         statusCode: 404,
            //                     });
            //                 } else {
            //                     // if (LOG_DEBUG) {
            //                     //     console.log(`${ACE_LOG_PREFIX} HTTP OK fsOriginal.exists ${basedir} + ${req.url} => ${filePath}`);
            //                     // }
            //                     callback({
            //                         data: null,
            //                         headers,
            //                         statusCode: 500,
            //                     });
            //                 }
            //             });
            //         } else {
            //             fs.exists(filePath, (exists) => {
            //                 if (exists) {
            //                     fs.readFile(filePath, undefined, (err, data) => {
            //                         if (err) {
            //                             if (LOG_DEBUG) {
            //                                 console.log(`${ACE_LOG_PREFIX} HTTP FAIL !fsOriginal.exists && fs.exists && ERR ${basedir} + ${req.url} => ${filePath}`, err);
            //                             }
            //                             filePathsExpressStaticNotExist[filePath] = err.toString();
            //                             const buff = Buffer.from(filePathsExpressStaticNotExist[filePath]);
            //                             headers["Content-Length"] = buff.length.toString();
            //                             headers["Content-Type"] = "plain/text";
            //                             callback({
            //                                 data: bufferToStream(buff),
            //                                 headers,
            //                                 statusCode: 404,
            //                             });
            //                         } else {
            //                             if (LOG_DEBUG) {
            //                                 console.log(`${ACE_LOG_PREFIX} HTTP OK !fsOriginal.exists && fs.exists ${basedir} + ${req.url} => ${filePath}`);
            //                             }
            //                             callback({
            //                                 data: null,
            //                                 headers,
            //                                 statusCode: 500,
            //                             });
            //                         }
            //                     });
            //                 } else {
            //                     if (LOG_DEBUG) {
            //                         console.log(`${ACE_LOG_PREFIX} HTTP FAIL !fsOriginal.exists && !fs.exists ${basedir} + ${req.url} => ${filePath}`);
            //                     }
            //                     callback({
            //                         data: null,
            //                         headers,
            //                         statusCode: 404,
            //                     });
            //                 }
            //             });
            //         }
            //     });
            // }
        };

        // NO_HTTP_REMOVE
        // expressApp = express();
        // // expressApp.enable('strict routing');
        // // expressApp.use("/", (req, res, next) => {
        // //     if (LOG_DEBUG) console.log("HTTP: " + req.url);
        // //     next();
        // // });
        // expressApp.basedir = basedir;
        // expressApp.use("/", (req, res, next) => {
        //     next();
        // });
        // if (isDev) { // handle WebInspector JS maps etc.
        //     expressApp.use("/", (req, res, next) => {
        //     });
        // }

        // // https://expressjs.com/en/4x/api.html#express.static
        // const staticOptions = {
        //     dotfiles: "ignore",
        //     etag: true,
        //     // fallthrough: false,
        //     immutable: true,
        //     // index: "index.html",
        //     maxAge: "1d",
        //     redirect: false,
        //     // extensions: ["css", "otf"],
        //     // setHeaders: (res, _path, _stat) => {
        //     //     //   res.set('x-timestamp', Date.now())
        //     //     setResponseCORS(res);
        //     // },
        // };
        // if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} HTTP static path ${basedir}`);
        // expressApp.use("/", express.static(basedir, staticOptions));

        // const startHttp = function () {
        //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner generateSelfSignedData...`);
        //     generateSelfSignedData().then((certData) => {
        //         if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner generateSelfSignedData OK.`);

        //         httpServer = https.createServer({ key: certData.private, cert: certData.cert }, expressApp).listen(port, () => {
        //             const p = httpServer.address().port;

        //             port = p;
        //             ip = "127.0.0.1";
        //             proto = "https";
        //             rootUrl = `${proto}://${ip}:${port}`;
        //             if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} server URL ${rootUrl}`);

        //             resolve();
        //         });
        //     }).catch((err) => {
        //         if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} generateSelfSignedData error!`);
        //         if (LOG_DEBUG) console.log(err);
        //         httpServer = expressApp.listen(port, () => {
        //             const p = httpServer.address().port;

        //             port = p;
        //             ip = "127.0.0.1";
        //             proto = "http";
        //             rootUrl = `${proto}://${ip}:${port}`;
        //             if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} server URL ${rootUrl}`);

        //             resolve();
        //         });
        //     });
        // }

        // portfinder.getPortPromise().then((p) => {
        //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner HTTP port ${p}`);
        //     port = p;
        //     startHttp();
        // }).catch((err) => {
        //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner HTTP port error!`);
        //     console.log(err);
        //     port = 3000;
        //     startHttp();
        // });
    // });
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
