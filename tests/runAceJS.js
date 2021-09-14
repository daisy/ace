'use strict';

const ace = require('@daisy/ace-core');
const logger = require('@daisy/ace-logger');

let axeRunnerPuppeteer = undefined;
let axeRunnerElectron = undefined;
if (process.env.AXE_ELECTRON_RUNNER) {
  // Removes the deprecation warning message in the console
  // https://github.com/electron/electron/issues/18397
  // require('electron').app.allowRendererProcessReuse = true;
  // done in patching ./node_modules/@jest-runner/electron/build/electron_process_injected_code.js
  // https://www.electronjs.org/releases/stable#breaking-changes-1400

  const EventEmitter = require('events');
  class ElectronMockMainRendererEmitter extends EventEmitter {}
  const eventEmmitter = new ElectronMockMainRendererEmitter();
  eventEmmitter.send = eventEmmitter.emit;
  eventEmmitter.ace_notElectronIpcMainRenderer = true;

  const CONCURRENT_INSTANCES = 4; // same as the Puppeteer Axe runner

  const axeRunnerElectronFactory = require('@daisy/ace-axe-runner-electron');
  axeRunnerElectron = axeRunnerElectronFactory.createAxeRunner(eventEmmitter, CONCURRENT_INSTANCES);

  const prepareLaunch = require('@daisy/ace-axe-runner-electron/lib/init').prepareLaunch;
  prepareLaunch(eventEmmitter, CONCURRENT_INSTANCES);
} else {
  axeRunnerPuppeteer = require('@daisy/ace-axe-runner-puppeteer');
}

function runAce(epub, {
    cwd = process.cwd(),
    outdir,
    tmpdir,
    verbose = false,
    silent = true,
    lang = "en",
  } = {}) {

  logger.initLogger({ verbose, silent, fileName: "ace-tests.log", maxMinutes: 1 });

  return ace(epub, {
    cwd,
    outdir,
    tmpdir,
    verbose,
    silent,
    lang,
  }, process.env.AXE_ELECTRON_RUNNER ? axeRunnerElectron : axeRunnerPuppeteer);
}

module.exports = runAce;
