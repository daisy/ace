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
"a11y:certifiedBy",
"dcterms:conformsTo"
];


module.exports = {
  // each report is content doc level
  analyze: function(metadata, links) {
    winston.info("Analyzing accessibility metadata");
    var results = {"missing": [], "empty": [], "present": []};
    a11yMeta.forEach(function(property) {
      if (metadata != undefined && property in metadata) {
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
      else if (links != undefined && property in links) {
        if (
          (typeof links[property] === 'string' && links[property].trim().length > 0)
          ||
          (Array.isArray(links[property]) && links[property].length > 0)
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
