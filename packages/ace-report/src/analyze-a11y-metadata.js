'use strict';

// input: json extraction of metadata
// output: description of accessibility metadata
/*
{
"missing": ["accessibilityFeature", "accessibilityAPI"],
"empty": ["accessibilityControl"],
"present": ["accessibilityHazard"]
}

*/

const winston = require('winston');

const a11yMeta = [
"schema:accessMode",
"schema:accessibilityFeature",
"schema:accessibilityHazard",
"schema:accessibilitySummary",
"schema:accessModeSufficient",
"schema:accessibilityAPI",
"schema:accessibilityControl",
"a11y:certifiedBy"
];


module.exports = {
  // each report is content doc level
  analyze: function(metadata) {
    winston.info("Analyzing accessibility metadata");
    var results = {"missing": [], "empty": [], "present": []};
    a11yMeta.forEach(function(property) {
      if (property in metadata) {
        if (
          (typeof metadata[property] === 'string' && metadata[property].trim().length > 0)
          ||
          (Array.isArray(metadata[property]) && metadata[property].length > 0)
          ){
          results["present"].push(property);
        }
        else {
          results["empty"].push(property);
        }
      }
      else {
        results["missing"].push(property);
      }
    });
    return results;
  }
}
