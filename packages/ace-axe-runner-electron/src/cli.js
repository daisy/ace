'use strict';

const electron = require('electron');
const app = electron.app;
// const ipcMain = electron.ipcMain;
// const ipcRenderer = electron.ipcRenderer;

const EventEmitter = require('events');
class ElectronMockMainRendererEmitter extends EventEmitter {}
const eventEmmitter = new ElectronMockMainRendererEmitter();
eventEmmitter.send = eventEmmitter.emit;
eventEmmitter.ace_notElectronIpcMainRenderer = true;

const CONCURRENT_INSTANCES = 4; // same as the Puppeteer Axe runner

const axeRunnerElectron = require('@daisy/ace-axe-runner-electron');
const axeRunner = axeRunnerElectron.createAxeRunner(eventEmmitter, CONCURRENT_INSTANCES);

const cli = require('@daisy/ace-cli-shared');

const axeRunnerInit = require('./init').axeRunnerInit;

let isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const LOG_DEBUG = false;
const AXE_LOG_PREFIX = "[AXE]";

if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner launch...`);

// let win;
app.on('ready', () => {
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner app ready.`);
    axeRunnerInit(eventEmmitter, CONCURRENT_INSTANCES);
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner run...`);

    // win = new BrowserWindow(
    //     {
    //         show: false,
    //         webPreferences: {
    //             allowRunningInsecureContent: false,
    //             contextIsolation: false,
    //             nodeIntegration: true,
    //             nodeIntegrationInWorker: false,
    //             sandbox: false,
    //             webSecurity: true,
    //             webviewTag: false,
    //         }
    //     }
    // );
    // // win.maximize();
    // // let sz = win.getSize();
    // // const sz0 = sz[0];
    // // const sz1 = sz[1];
    // // win.unmaximize();
    // // // open a window that's not quite full screen ... makes sense on mac, anyway
    // // win.setSize(Math.min(Math.round(sz0 * .75),1200), Math.min(Math.round(sz1 * .85), 800));
    // // // win.setPosition(Math.round(sz[0] * .10), Math.round(sz[1] * .10));
    // // win.setPosition(Math.round(sz0*0.5-win.getSize()[0]*0.5), Math.round(sz1*0.5-win.getSize()[1]*0.5));
    // // win.show();
  
    // win.loadURL(`file://${__dirname}/index.html`);
    // win.on('closed', function () {
    //     if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner win closed.`);
    // });

    cli.run(axeRunner, app.quit);
});
app.on('activate', function () {
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner app activate.`);
});
app.on('window-all-closed', function () {
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner app window-all-closed.`);
});
app.on('before-quit', function() {
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner app before-quit.`);
});
app.on('quit', () => {
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner app quit.`);
});
