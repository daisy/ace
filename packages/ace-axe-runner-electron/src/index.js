'use strict';

const LOG_DEBUG = false;
const ACE_LOG_PREFIX = "[ACE-AXE]";

let cliOption_MILLISECONDS_TIMEOUT_EXTENSION = undefined;

function createAxeRunner(eventEmmitter, CONCURRENT_INSTANCES) {

    return {
        setTimeout: function (ms) {
          try {
              cliOption_MILLISECONDS_TIMEOUT_EXTENSION = parseInt(ms, 10);
          } catch(_e) {
              // ignore
          }
        },
        concurrency: CONCURRENT_INSTANCES,
        launch: function () {
            if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner will launch ...`);

            return new Promise((resolve, reject) => {
                // ipcRenderer
                const callback = (event, arg) => {
                    const payload = eventEmmitter.ace_notElectronIpcMainRenderer ? event : arg;
                    // const sender = eventEmmitter.ace_notElectronIpcMainRenderer ? eventEmmitter : event.sender;

                    if (eventEmmitter.ace_notElectronIpcMainRenderer) {
                        eventEmmitter.removeListener('AXE_RUNNER_LAUNCH_', callback);
                    }

                    if (payload.ok !== null && typeof payload.ok !== "undefined") {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did launch OK.`);
                        resolve(payload.ok);
                    } else {
                        if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner did launch FAIL.`);
                        console.log(payload.err);
                        reject(payload.err);
                    }
                };
                if (eventEmmitter.ace_notElectronIpcMainRenderer) {
                    eventEmmitter.on('AXE_RUNNER_LAUNCH_', callback);
                } else {
                    eventEmmitter.once('AXE_RUNNER_LAUNCH_', callback);
                }

                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner about to launch ...`);
                // ipcRenderer
                eventEmmitter.send('AXE_RUNNER_LAUNCH', {});
            });
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

                    if (payload.url === url) {
                        eventEmmitter.removeListener('AXE_RUNNER_RUN_', callback);

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
                eventEmmitter.on('AXE_RUNNER_RUN_', callback);

                if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner about to run ... ${url}`);
                // ipcRenderer
                eventEmmitter.send('AXE_RUNNER_RUN', {
                    url,
                    scripts,
                    scriptContents,
                    basedir,
                    cliOption_MILLISECONDS_TIMEOUT_EXTENSION,
                });
            });
        }
    };
}

module.exports = { createAxeRunner };
