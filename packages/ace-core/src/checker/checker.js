'use strict';

const htmlChecker = require('./checker-chromium.js');
const epubChecker = require('./checker-epub.js');
const winston = require('winston');

function consolidate(results, report) {
  winston.info('Consolidating results...');
  // Integrate checker results to the report
  results.forEach((res) => {
    if (res.assertions) {
      report.addAssertions(res.assertions);
    }
    if (res.properties) {
      report.addProperties(res.properties);
    }
    if (res.data) {
      report.addData(res.data);
    }
  });
  // Get a flat array of all the headings in the documents
  const headings = []
    .concat(...results.map(docResult => {
      if (docResult.outlines && docResult.outlines.headings) {
        return docResult.outlines.headings;
      }
      return undefined;
    }))
    .filter(e => e !== undefined);
  report.addHeadings(headings);
  // Aggregated array of the HTML outlines
  const htmlOutlines = []
    .concat(results.map(docResult => {
      if (docResult.outlines && docResult.outlines.html) {
        return docResult.outlines.html;
      }
      return undefined;
    }))
    .filter(e => e !== undefined);
  report.addHTMLOutlines(htmlOutlines);
  return report;
}

module.exports.check = function check(epub, report, lang, axeRunner) {
  return epubChecker.check(epub, report)
    .then(() => htmlChecker.check(epub, lang, axeRunner))
    .then(results => consolidate(results, report));
};
