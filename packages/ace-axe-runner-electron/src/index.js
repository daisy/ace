'use strict';

const electron = require('electron');
const app = electron.app;

const logger = require('@daisy/ace-logger');
logger.initLogger({ verbose: true, silent: false });

const axeRunnerInit = require('./init').axeRunnerInit;

const isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const LOG_DEBUG = false;
const ACE_LOG_PREFIX = "[ACE-AXE]";

let _needsInit = true;

function createAxeRunner(eventEmmitter, CONCURRENT_INSTANCES) {

    app.whenReady().then(() => {
        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner app ready, init ...`);

        _needsInit = false;
        axeRunnerInit(eventEmmitter, CONCURRENT_INSTANCES);

        if (eventEmmitter.ace_notElectronIpcMainRenderer) {
            eventEmmitter.send('AXE_RUNNER_READY', {});
        }
    });

    return {
        concurrency: CONCURRENT_INSTANCES,
        launch: function () {
            if (_needsInit) {
                _needsInit = false;
                axeRunnerInit(eventEmmitter, CONCURRENT_INSTANCES);
            }
            return Promise.resolve();
            // return new Promise((resolve, reject) => {
            // });
        },
        close: function () {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner will close ...`);
    
            // // ipcRenderer
            // eventEmmitter.send('AXE_RUNNER_CLOSE', {});
            // return Promise.resolve();

            return new Promise((resolve, reject) => {
                // ipcRenderer
                const callback = (event, arg) => {
                    const payload = eventEmmitter.ace_notElectronIpcMainRenderer ? event : arg;
                    // const sender = eventEmmitter.ace_notElectronIpcMainRenderer ? eventEmmitter : event.sender;

                    _needsInit = true;

                    if (eventEmmitter.ace_notElectronIpcMainRenderer) {
                        eventEmmitter.removeListener('AXE_RUNNER_CLOSE_', callback);
                    }

                    if (payload.ok !== null && typeof payload.ok !== "undefined") {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did close OK.`);
                        resolve(payload.ok);
                    } else {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did close FAIL.`);
                        console.log(payload.err);
                        reject(payload.err);
                    }
                };
                if (eventEmmitter.ace_notElectronIpcMainRenderer) {
                    eventEmmitter.on('AXE_RUNNER_CLOSE_', callback);
                } else {
                    eventEmmitter.once('AXE_RUNNER_CLOSE_', callback);
                }

                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner about to close ...`);
                // ipcRenderer
                eventEmmitter.send('AXE_RUNNER_CLOSE', {});
            });
        },
        run: function (url, scripts, scriptContents, basedir) {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner will run ... ${url}`);
    
            return new Promise((resolve, reject) => {
                // ipcRenderer
                const callback = (event, arg) => {
                    const payload = eventEmmitter.ace_notElectronIpcMainRenderer ? event : arg;
                    // const sender = eventEmmitter.ace_notElectronIpcMainRenderer ? eventEmmitter : event.sender;

                    if (!eventEmmitter.ace_notElectronIpcMainRenderer || payload.url === url) {
                        if (eventEmmitter.ace_notElectronIpcMainRenderer) {
                            eventEmmitter.removeListener('AXE_RUNNER_RUN_', callback);
                        }

                        if (payload.ok !== null && typeof payload.ok !== "undefined") {
                            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did run OK. ${url} ${payload.url}`);
                            resolve(payload.ok);
                        } else {
                            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did run FAIL. ${url} ${payload.url}`);
                            console.log(payload.err);
                            reject(payload.err);
                        }
                    } else {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner received AXE_RUNNER_RUN_ but filter out: ${url} ${payload.url}`);
                    }
                };
                if (eventEmmitter.ace_notElectronIpcMainRenderer) {
                    eventEmmitter.on('AXE_RUNNER_RUN_', callback);
                } else {
                    eventEmmitter.once('AXE_RUNNER_RUN_', callback);
                }

                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner about to run ... ${url}`);
                // ipcRenderer
                eventEmmitter.send('AXE_RUNNER_RUN', {
                    url,
                    scripts,
                    scriptContents,
                    basedir,
                });
            });
        }
    };
}

module.exports = { createAxeRunner };