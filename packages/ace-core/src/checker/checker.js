'use strict';

const { localize } = require('../l10n/localize').localizer;
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
    .filter(e => e);
  report.addHeadings(headings);
  // Aggregated array of the HTML outlines
  const htmlOutlines = []
    .concat(results.map(docResult => {
      if (docResult.outlines && docResult.outlines.html) {
        return docResult.outlines.html;
      }
      return undefined;
    }))
    .filter(e => e);
  report.addHTMLOutlines(htmlOutlines);
  return report;
}

module.exports.check = function check(epub, report, lang, axeRunner) {
  return epubChecker.check(epub, report)
    .then(async (obj) => {
      return htmlChecker.check(epub, lang, axeRunner).then((results) => {
        return new Promise((res) => {
          res({
            assertion: obj.assertion,
            has_accessibilityFeature_printPageNumbersPageBreakMarkers: obj.has_accessibilityFeature_printPageNumbersPageBreakMarkers,
            res: results,
          });
        });
      });
    })
    .then((results) => {
      // console.log(JSON.stringify(results, null, 4));
      // throw new Error("DEBUGG");

      const hasPageBreaks = !!results.res.find((item) => {
        return !!item.properties.hasPageBreaks;
      });
      if (results.has_accessibilityFeature_printPageNumbersPageBreakMarkers && !hasPageBreaks
        // || !results.has_accessibilityFeature_printPageNumbersPageBreakMarkers && hasPageBreaks
      ) {
        results.assertion.withAssertions(epubChecker.newViolation({
          impact: 'moderate',
          title: `metadata-accessibilityFeature-printPageNumbers-nopagebreaks`,
          testDesc: localize("checkepub.metadatapagebreaks.testdesc", {}),
          resDesc: localize("checkepub.metadatapagebreaks.resdesc", {}),
          kbPath: 'docs/metadata/schema.org/index.html',
          kbTitle: localize("checkepub.metadatapagebreaks.kbtitle"),
          ruleDesc: localize("checkepub.metadatapagebreaks.ruledesc", {})
        }));
      }

      const builtAssertions = results.assertion.build();
      report.addAssertions(builtAssertions);

      winston.info(`- ${epub.packageDoc.src}: ${
          (builtAssertions.assertions && builtAssertions.assertions.length > 0)
            ? builtAssertions.assertions.length
            : 'No'} issues found`);

      return consolidate(results.res, report);
    });
};
