'use strict';

const htmlChecker = require('./checker-chromium.js');
const epubChecker = require('./checker-epub.js');
const winston = require('winston');

function consolidate(results, report) {
  winston.info('Consolidating results...');
  // Integrate checker results to the report
  results.forEach((res) => {
    report.addAssertions(res.assertions);
    report.addProperties(res.properties);
    report.addData(res.data);
  });
  // Get a flat array of all the headings in the documents
  const headings = []
    .concat(...results.map(docResult => docResult.outlines.headings))
    .filter(e => e !== undefined);
  report.addHeadings(headings);
  // Aggregated array of the HTML outlines
  const htmlOutlines = results.map(docResult => docResult.outlines.html);
  report.addHTMLOutlines(htmlOutlines);
  return report;
}

module.exports.check = function check(epub, report,lang) {
  return epubChecker.check(epub, report)
    .then(() => htmlChecker.check(epub, lang))
    .then(results => consolidate(results, report));
};
