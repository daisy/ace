'use strict';

const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

const checker = require('../checker/checker.js');
const EPUB = require('../epub/epub.js');
const report = require('../report/report.js');

tmp.setGracefulCleanup();

module.exports = function ace(epubPath, options) {
  // Check that the EPUB exists
  if (!fs.existsSync(epubPath)) {
    console.log(`Couldn’t find EPUB file '${epubPath}'`);
    process.exit(1);
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

  /* eslint-enable no-param-reassign */

  // Unzip the EPUB
  var epub = new EPUB(epubPath);
  epub.extract()
  .then(() => epub.parse())
  // initialize the report
  .then(() => report.initialize(epub))
  // Check each Content Doc
  .then(() => checker.check(epub.contentDocs))
  // Process the Results
  //.then(results => Promise.all(results.map(report.processResult, options)))
//  .then(() => report.createSummary(epubPath, options.tmpdir, options.outdir))
  //.then(() => report.saveJson(options.outdir))
  //.then(() => console.log('Done.'))
  .then(() => report.saveJson(options.outdir))
  .catch((err) => {
    console.error(`Unexpected error: ${err}`);
    process.exit(1);
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
