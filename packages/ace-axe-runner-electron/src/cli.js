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

const axeRunnerElectronFactory = require('@daisy/ace-axe-runner-electron');
const axeRunner = axeRunnerElectronFactory.createAxeRunner(eventEmmitter, CONCURRENT_INSTANCES);

const prepareLaunch = require('./init').prepareLaunch;
prepareLaunch(eventEmmitter, CONCURRENT_INSTANCES);

const cli = require('@daisy/ace-cli-shared');

const LOG_DEBUG = false;
const ACE_LOG_PREFIX = "[ACE-AXE]";

if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner CLI launch...`);

// let win;
// app.whenReady().then(() => {
app.on('ready', async () => {
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner CLI app ready.`);

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
    //     if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner win closed.`);
    // });

    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner run...`);
    await cli.run(axeRunner, app.exit, "ace-cli-electron.log"); // const exitCode = app.quit();
});

app.on('activate', function () {
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner app activate.`);
});
app.on('window-all-closed', function () {
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner app window-all-closed.`);
});
app.on('before-quit', function() {
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner app before-quit.`);
});
app.on('quit', () => {
    if (LOG_DEBUG) console.log(`${ACE_LOG_PREFIX} axeRunner app quit.`);
});
