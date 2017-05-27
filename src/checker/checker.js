'use strict';

const checker = require('./checker-nightmare.js');

module.exports.check = function check(urls) {
  console.log("Checking documents...");
  return checker.check(urls);
};
