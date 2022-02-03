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

// duplicate of /ace-core/a11y-metadata.js :(
// (circular dependency reference)
const a11yMeta = [
// http://kb.daisy.org/publishing/docs/metadata/schema.org/index.html
"schema:accessMode",
"schema:accessibilityFeature",
"schema:accessibilityHazard",
"schema:accessibilitySummary",
"schema:accessModeSufficient",

"schema:accessibilityAPI",
"schema:accessibilityControl",
// (see a11yMetadata.A11Y_META in ace-core)

// http://kb.daisy.org/publishing/docs/metadata/evaluation.html
"a11y:certifiedBy",
"a11y:certifierCredential", //(MAY BE link in EPUB3)
"a11y:certifierReport", //(link in EPUB3)
"dcterms:conformsTo" //(link in EPUB3)
];

module.exports = {
  // each report is content doc level
  analyze: function(metadata, links) {
    winston.info("Analyzing accessibility metadata");
    var results = {"missing": [], "empty": [], "present": []};
    a11yMeta.forEach(function(property) {
      if (metadata != undefined && property in metadata) {
        const val = metadata[property];
        if (
          (typeof val === 'string' && val.trim().length > 0)
          ||
          (Array.isArray(val) && val.length > 0)
          ){
          results["present"].push(property);
        }
        else {
          results["empty"].push(property);
        }
      }
      else if (links != undefined && property in links) {
        const val = links[property];
        if (
          (typeof val === 'string' && val.trim().length > 0)
          ||
          (Array.isArray(val) && val.length > 0)
          ){
          results["present"].push(property);
        }
        else {
          results["empty"].push(property);
        }
      }
      // discouraged: true
      else if (property !== "schema:accessibilityAPI" && property !== "schema:accessibilityControl") {
        results["missing"].push(property);
      }
    });
    return results;
  }
}
