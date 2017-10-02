'use strict';

const fs = require('fs-extra');
const path = require('path');
const tmp = require('tmp');

const checker = require('../checker/checker.js');
const EPUB = require('../epub/epub.js');
const report = require('../report/report.js');
const winston = require('winston');

tmp.setGracefulCleanup();

module.exports = function ace(epubPath, options) {
  return new Promise((resolve, reject) => {
    // the jobid option just gets returned in the resolve/reject
    // so the calling function can track which job finished
    var jobId = 'jobid' in options ? options.jobid : '';
    winston.verbose("ACE", options);

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
        fs.mkdirSync(options.tmpdir);
      }
    } else if (options.tmpdir === undefined) {
      options.tmpdir = tmp.dirSync({ unsafeCleanup: true }).name;
    }
    if (typeof options.outdir === 'string') {
      options.outdir = path.resolve(options.cwd, options.outdir);
      if (!fs.existsSync(options.outdir)) {
        fs.mkdirSync(options.outdir);
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
    .then(() => report.initialize(epub))
    // Report the Nav Doc
    .then(() => report.addEPUBNav(epub.navDoc))
    // Check each Content Doc
    .then(() => checker.check(epub))
    // Process the Results
    .then(() => {
      if (options.outdir === undefined) {
        winston.info(JSON.stringify(report.getJsonReport(), null, '  '));
      } else {
        return Promise.all([
          report.copyData(options.outdir),
          report.saveJson(options.outdir),
          report.saveHtml(options.outdir),
        ]);
      }
    })
    .then(() => {
      winston.info('Done.');
      resolve(jobId);
    })
    .catch((err) => {
      winston.error(`Unexpected error: ${(err.message !== undefined) ? err.message : err}`);
      if (err.stack !== undefined) winston.debug(err.stack);
      reject(jobId);
    });
  });
  // // Alternatively: use reduce to process results progressively ?
  // new EPUB(epubPath).extract()
  // .then(epub => epub.getContentDocsPaths())
  // .then(paths => paths.map(path => `file://${path}`))
  // .then(urls =>
  //   urls.reduce((sequence, url) =>
  //     sequence.then(() => check(url)).then((result) => {
  //       console.log(`do sth with ${result}`);
  //       return result;
  //     }), Promise.resolve()))
  // .then(...);
  //   getJSON('story.json').then(function(story) {
  //   addHtmlToPage(story.heading);
};
