'use strict';

const fs = require('fs');
const meow = require('meow');
const path = require('path');
const winston = require('winston');

const axeRunner = require('@daisy/ace-axe-runner-electron');

const logger = require('@daisy/ace-logger');
const ace = require('@daisy/ace-core');

const { config, paths } = require('@daisy/ace-config');
const defaults = require('./defaults');
const cliConfig  = config.get('cli', defaults.cli);

const pkg = require('@daisy/ace-meta/package');

const electron = require('electron');
const app = electron.app;
const ipcRenderer = electron.ipcRenderer;

let isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const LOG_DEBUG = false;
const AXE_LOG_PREFIX = "[AXE]";

if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner launch...`);

const cli = meow({
    help:
  `
    Usage: ace [options] <input>
  
    Options:
  
      -h, --help             output usage information
      -v, --version          output the version number
  
      -o, --outdir  <path>   save final reports to the specified directory
      -t, --tempdir <path>   specify a custom directory to store the temporary reports
      -f, --force            override any existing output file or directory
          --subdir           output reports to a sub-directory named after the input EPUB
  
      -V, --verbose          display verbose output
      -s, --silent           do not display any output
  
      -l, --lang  <language> language code for localized messages (e.g. "fr"), default is "en"
    Examples
      $ ace -o out ~/Documents/book.epub
  `,
// autoVersion: false,
version: pkg.version
}, {
    alias: {
        f: 'force',
        h: 'help',
        o: 'outdir',
        s: 'silent',
        t: 'tempdir',
        v: 'version',
        V: 'verbose',
        l: 'lang',
    },
    boolean: ['force', 'verbose', 'silent', 'subdir'],
    string: ['outdir', 'tempdir', 'lang'],
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
app.on('ready', () => {
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner app ready.`);
    axeRunnerInitEvents();
    ipcRenderer.once('AXE_RUNNER_CLOSED', (event, arg) => {
        if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner app quit...`);
        app.quit();
    });
    if (LOG_DEBUG) console.log(`${AXE_LOG_PREFIX} axeRunner run...`);
    if (LOG_DEBUG) console.log(cli.input);
    run();
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

async function run() {
  logger.initLogger({ verbose: cli.flags.verbose, silent: cli.flags.silent });

  // Check that an EPUB path is specified
  if (cli.input.length === 0) {
    winston.logAndExit('error', 'Input required', () => {
      console.log(cli.help);
      process.exit(1);
    });
    await sleep(5000);
    process.exit(1);
  }

  // Check that output directories can be overridden
  let outdir = cli.flags.outdir;
  if (outdir) {
    if (cli.flags.subdir) {
      outdir = path.join(outdir, path.parse(cli.input[0]).name);
    }
    if (!cli.flags.force) {
      const overrides = ['report.json', 'report.html', 'data', 'js']
        .map(file => path.join(outdir, file))
        .filter(fs.existsSync);
      if (overrides.length > 0) {
        winston.logAndExit('warn', `\
Output directory is not empty.

  Running Ace would override the following files or directories:

${overrides.map(file => `  - ${file}`).join('\n')}

  Use option --force to override.
`, 1);
        await sleep(5000);
        process.exit(1);
      }
    }
  }

  // finally, invoke Ace
  ace(cli.input[0], {
    cwd: cli.flags.cwd || process.cwd(),
    outdir,
    tmpdir: cli.flags.tempdir,
    verbose: cli.flags.verbose,
    silent: cli.flags.silent,
    jobId: '',
    lang: cli.flags.lang,
  }, axeRunner)
  .then((jobData) => {
    var reportJson = jobData[1];
    // if there were violations from the validation process, return 2
    if (cliConfig['return-2-on-validation-error'] &&
    reportJson['earl:result']['earl:outcome'] === 'fail') {
      winston.logAndExit('info', 'Closing logs.', () => {
        process.exit(2);
      });
    }
  })
  .catch((err) => {
    if (err && err.message) winston.error(err.message);
    winston.logAndExit('info', 'Closing logs.', () => {
      console.log('Re-run Ace using the --verbose option to enable full debug logging.');
      process.exit(1);
    });
  });
}
