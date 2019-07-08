'use strict';

const ace = require('@daisy/ace-core');
const logger = require('@daisy/ace-logger');

const axeRunnerPuppeteer = require('@daisy/ace-axe-runner-puppeteer');
let axeRunnerElectron = undefined;
if (process.env.AXE_ELECTRON_RUNNER) {
  const EventEmitter = require('events');
  class ElectronMockMainRendererEmitter extends EventEmitter {}
  const eventEmmitter = new ElectronMockMainRendererEmitter();
  eventEmmitter.send = eventEmmitter.emit;
  eventEmmitter.ace_notElectronIpcMainRenderer = true;

  const CONCURRENT_INSTANCES = 4; // same as the Puppeteer Axe runner

  const axeRunnerElectronFactory = require('@daisy/ace-axe-runner-electron');
  axeRunnerElectron = axeRunnerElectronFactory.createAxeRunner(eventEmmitter, CONCURRENT_INSTANCES);
}

function runAce(epub, {
    cwd = process.cwd(),
    outdir,
    tmpdir,
    verbose = false,
    silent = true,
    lang = "en",
  } = {}) {

  logger.initLogger({ verbose, silent });

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
