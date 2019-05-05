'use strict';

const fs = require('fs-extra');
const path = require('path');
const tmp = require('tmp');
const winston = require('winston');
const os = require('os');
const pkg = require('@daisy/ace-meta/package');

const EPUB = require('@daisy/epub-utils').EPUB;
const Report = require('@daisy/ace-report').Report;
const checker = require('../checker/checker.js');
const { setCurrentLanguage } = require('../l10n/localize').localizer;

const logger = require('@daisy/ace-logger');

tmp.setGracefulCleanup();

module.exports = function ace(epubPath, options, axeRunner) {

  if (options.lang) {
    setCurrentLanguage(options.lang);
  }

  if (options.initLogger) {
    logger.initLogger({ verbose: options.verbose, silent: options.silent });
  }

  return new Promise((resolve, reject) => {
    // the jobid option just gets returned in the resolve/reject
    // so the calling function can track which job finished
    var jobId = 'jobid' in options ? options.jobid : '';
    winston.verbose(`Ace ${pkg.version}, Node ${process.version}, ${os.type()} ${os.release()}`);
    winston.verbose("Options:", options);

    // Check that the EPUB exists
    const epubPathResolved = path.resolve(options.cwd, epubPath);
    if (!fs.existsSync(epubPathResolved)) {
      winston.error(`Couldn’t find EPUB file '${epubPath}'`);
      return reject(jobId);
    }

    // Process options
    /* eslint-disable no-param-reassign */
    if (typeof options.tmpdir === 'string') {
      options.tmpdir = path.resolve(options.cwd, options.tmpdir);
      if (!fs.existsSync(options.tmpdir)) {
        fs.ensureDirSync(options.tmpdir);
      }
    } else if (options.tmpdir === undefined) {
      options.tmpdir = tmp.dirSync({ unsafeCleanup: true }).name;
    }
    if (typeof options.outdir === 'string') {
      options.outdir = path.resolve(options.cwd, options.outdir);
      if (!fs.existsSync(options.outdir)) {
        fs.ensureDirSync(options.outdir);
      }
    } else {
      delete options.outdir;
    }

    winston.info("Processing " + epubPath);

    /* eslint-enable no-param-reassign */

    // Unzip the EPUB
    const epub = new EPUB(epubPathResolved);
    epub.extract()
    .then(() => epub.parse())
    // initialize the report
    .then(() => new Report(epub, options.outdir, options.lang))
    // Check each Content Doc
    .then(report => checker.check(epub, report, options.lang, axeRunner))
    // Process the Results
    .then((report) => {
      if (options.outdir === undefined) {
        report.cleanData();
        process.stdout.write(`${JSON.stringify(report.json, null, '  ')}\n`);
        return report;
      }
      return report.copyData(options.outdir)
      .then(() => report.cleanData())
      .then(() => Promise.all([
          report.saveJson(options.outdir),
          report.saveHtml(options.outdir)
      ]))
      .then(() => report);
    })
    .then((report) => {
      winston.info('Done.');
      resolve([jobId, report.json]);
    })
    .catch((err) => {
      winston.error(`Unexpected error: ${(err.message !== undefined) ? err.message : err}`);
      if (err.stack !== undefined) winston.debug(err.stack);
      reject(jobId);
    });
  });
};
