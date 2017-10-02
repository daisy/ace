'use strict';

const checker = require('./checker-nightmare.js');
const winston = require('winston');

function finalize(results, report) {
  // Copy assertions
  results
    .filter(res => res.assertions != null)
    .forEach(res => report.addContentDocAssertion(res.assertions));
  // Get a flat array of all the headings in the documents
  const headings = []
    .concat(...results.map(docResult => docResult.outlines.headings))
    .filter(e => e !== undefined);
  report.addHeadings(headings);
  // Aggregated array of the HTML outlines
  const htmlOutlines = results.map(docResult => docResult.outlines.html);
  report.addHTMLOutlines(htmlOutlines);
  // Get a flat array of the extracted images
  const images = []
    .concat(...results.map(docResult => docResult.data.images))
    .filter(e => e !== undefined);
  report.addImages(images);
  return report;
}

module.exports.check = function check(epub, report) {
  winston.info('Checking documents...');
  return checker.check(epub)
    .then(results => finalize(results, report));
};
