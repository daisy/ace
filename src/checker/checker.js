'use strict';

const checker = require('./checker-nightmare.js');
const report = require('../report/report.js');
const winston = require('winston');

function finalize(results) {
  // Get a flat array of all the headings in the documents
  const headings = [].concat(...results.map(single => single.outlines.headings));
  report.addHeadings(headings);
  // Aggregated array of the HTML outlines
  const htmlOutlines = results.map(single => single.outlines.html);
  report.addHTMLOutlines(htmlOutlines);
  // Get a flat array of the extracted images
  const images = [].concat(...results.map(single => single.data.images));
  report.addImages(images);
  return results;
}

module.exports.check = function check(epub) {
  winston.info('Checking documents...');
  return checker.check(epub)
    .then(results => finalize(results));
};
