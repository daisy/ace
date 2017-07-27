'use strict';

const checker = require('./checker-nightmare.js');

module.exports.check = function check(spineItems) {
  console.log("Checking documents...");
  return checker.check(spineItems);
};
