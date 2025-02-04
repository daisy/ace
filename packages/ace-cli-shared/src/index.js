'use strict';

const fs = require('fs');
const meow = require('meow');
const path = require('path');
const winston = require('winston');

const logger = require('@daisy/ace-logger');
const ace = require('@daisy/ace-core');

const { config, paths } = require('@daisy/ace-config');
const defaults = require('./defaults');
const cliConfig  = config.get('cli', defaults.cli);

const pkg = require('@daisy/ace-meta/package');

const { localizer } = require('@daisy/ace-report');

const meowHelpMessage = `
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

    -T, --timeout <milliseconds> (default is 240000 per document)

    -E, --exiterror2 exit process with code 2 when fail (return-2-on-validation-error)
  Examples
    $ ace -o out ~/Documents/book.epub

  ${localizer.localize("sponsorship_prompt")}
  ${localizer.localize("sponsorship_link")} https://daisy.org/AceCLSponsor`;

const meowOptions = {
  autoHelp: false,
  autoVersion: false,
  version: pkg.version,
  flags: {
    force: {
      alias: 'f',
      type: 'boolean'
    },
    help: {
      alias: 'h'
    },
    outdir: {
      alias: 'o',
      type: 'string'
    },
    silent: {
      alias: 's',
      type: 'boolean'
    },
    tempdir: {
      alias: 't',
      type: 'string'
    },
    subdir: {
      type: 'boolean'
    },
    version: {
      alias: 'v'
    },
    verbose: {
      alias: 'V',
      type: 'boolean'
    },
    lang: {
      alias: 'l',
      type: 'string'
    },
    timeout: {
      alias: 'T',
      type: 'string'
    },
    exiterror2: { // process exit code
      alias: 'E',
      type: 'boolean'
    }
  }
};
const cli = meow(meowHelpMessage, meowOptions);

async function run(axeRunner, exit, logFileName) {

  if (cli.flags.help) {
    cli.showHelp(0);
    return;
  }

  if (cli.flags.version) {
    cli.showVersion(2);
    return;
  }

  let timeBegin = process.hrtime();
  function quit() {
    const timeElapsed = process.hrtime(timeBegin);
    const allowPerfReport = process.env.ACE_PERF; // !cli.flags.silent && cli.flags.verbose;
    if (allowPerfReport) console.log(`>>> ACE PERF: ${timeElapsed[0]} seconds + ${timeElapsed[1]} nanoseconds`);
    exit(...arguments);
  }

  logger.initLogger({ verbose: cli.flags.verbose, silent: cli.flags.silent, fileName: logFileName });

  // Check that an EPUB path is specified
  if (cli.input.length === 0) {
    const res = await winston.logAndWaitFinish('error', 'Input required');
    console.log(cli.help);
    quit(1);
    return;
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
        .filter(fs.existsSync)
        .map(file => file.replace(/\\/g, "/"));
      if (overrides.length > 0) {
        const res = await winston.logAndWaitFinish('warn',
          `\
Output directory is not empty.

  Running Ace would override the following files or directories:

${overrides.map(file => `  - ${file}`).join('\n')}

  Use option --force to override.
`
        );
        quit(1);
        return;
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
    timeout: cli.flags.timeout || undefined,
    exiterror2: cli.flags.exiterror2 || undefined,
  }, axeRunner)
  .then(async (jobData) => {
    var reportJson = jobData[1];
    // if there were violations from the validation process, return 2
    const fail = (!!cli.flags.exiterror2 || cliConfig['return-2-on-validation-error']) && reportJson['earl:result']['earl:outcome'] === 'fail';
    const res = await winston.logAndWaitFinish('info', 'Closing logs.');
    quit(fail ? 2 : 0);
  })
  .catch(async (err) => {
    winston.error(err.message ? err.message : err);
    if (err.stack) winston.debug(err.stack);

    const res = await winston.logAndWaitFinish('info', 'Closing logs.');
    console.log('Re-run Ace using the --verbose option to enable full debug logging.');
    quit(1);
  });
}

module.exports = { run };
