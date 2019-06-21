'use strict';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const logger = require('@daisy/ace-logger');
logger.initLogger({ verbose: true, silent: false });

let isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const LOG_DEBUG = false;
const AXE_LOG_PREFIX = "[AXE]";

export const axeRunner = {
    concurrency: 1,
    launch: function () {
        return Promise.resolve();
        // return new Promise((resolve, reject) => {
        // });
    },
    close: function () {
        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner will close ...`);

        ipcRenderer.send('AXE_RUNNER_CLOSE', {});
        return Promise.resolve();
        // return new Promise((resolve, reject) => {
        //     ipcRenderer.once('AXE_RUNNER_CLOSE_', (event, arg) => {
        //         if (arg.ok) {
        //             resolve(arg.ok);
        //         } else {
        //             reject(arg.err);
        //         }
        //     });
        //     ipcRenderer.send('AXE_RUNNER_CLOSE', {});
        // });
    },
    run: function (url, scripts, scriptContents, basedir) {
        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner will run ...`);

        return new Promise((resolve, reject) => {
            ipcRenderer.once('AXE_RUNNER_RUN_', (event, arg) => {
                if (arg.ok !== null && typeof arg.ok !== "undefined") {
                    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner did run OK.`);
                    resolve(arg.ok);
                } else {
                    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner did run FAIL.`);
                    console.log(arg.err);
                    reject(arg.err);
                }
            });

            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner about to run ...`);
            ipcRenderer.send('AXE_RUNNER_RUN', {
                url,
                scripts,
                scriptContents,
                basedir,
            });
        });
    }
};  