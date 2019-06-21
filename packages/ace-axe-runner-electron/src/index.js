'use strict';

const logger = require('@daisy/ace-logger');
logger.initLogger({ verbose: true, silent: false });

let isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const LOG_DEBUG = false;
const AXE_LOG_PREFIX = "[AXE]";

function createAxeRunner(eventEmmitter) {
    return {
        concurrency: 1,
        launch: function () {
            return Promise.resolve();
            // return new Promise((resolve, reject) => {
            // });
        },
        close: function () {
            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner will close ...`);
    
            eventEmmitter.send('AXE_RUNNER_CLOSE', {});
            return Promise.resolve();
            // return new Promise((resolve, reject) => {
            //     eventEmmitter.once('AXE_RUNNER_CLOSE_', (event, arg) => {
            //         const payload = arg ? arg : event;
            //         const sender = arg ? event.sender : eventEmmitter;
            //         if (payload.ok) {
            //             resolve(payload.ok);
            //         } else {
            //             reject(payload.err);
            //         }
            //     });
            //     eventEmmitter.send('AXE_RUNNER_CLOSE', {});
            // });
        },
        run: function (url, scripts, scriptContents, basedir) {
            if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner will run ...`);
    
            return new Promise((resolve, reject) => {
                eventEmmitter.once('AXE_RUNNER_RUN_', (event, arg) => {
                    const payload = arg ? arg : event;
                    const sender = arg ? event.sender : eventEmmitter;

                    if (payload.ok !== null && typeof payload.ok !== "undefined") {
                        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner did run OK.`);
                        resolve(payload.ok);
                    } else {
                        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner did run FAIL.`);
                        console.log(payload.err);
                        reject(payload.err);
                    }
                });
    
                if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner about to run ...`);
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