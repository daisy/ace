'use strict';

const Rules = require('./rules');
const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

const ASSERTED_BY = 'Ace';
const MODE = 'automatic';
const KB_BASE = 'http://kb.daisy.org/publishing/';

function asString(arrayOrString) {
  if (Array.isArray(arrayOrString) && arrayOrString.length > 0) {
    return asString(arrayOrString[0]);
  } else if (arrayOrString !== undefined) {
    return arrayOrString.toString().trim();
  }
  return '';
}

function newViolation({ impact = 'serious', title, testDesc, resDesc, kbPath, kbTitle, ruleDesc }) {
  return new builders.AssertionBuilder()
    .withAssertedBy(ASSERTED_BY)
    .withMode(MODE)
    .withTest(
      new builders.TestBuilder()
        .withImpact(impact)
        .withTitle(title)
        .withDescription(testDesc)
        .withHelp(
          KB_BASE + kbPath,
          kbTitle,
          ruleDesc)
        .withRulesetTags(['EPUB'])
        .build())
    .withResult(
      new builders.ResultBuilder('fail')
        .withDescription(resDesc)
        .build())
    .build();
}


function checkPageSource(assertion, epub) {
  if (epub.navDoc.hasPageList
    && (epub.metadata['dc:source'] === undefined
      || epub.metadata['dc:source'].toString() === '')) {
    assertion.withAssertions(newViolation({
      title: 'epub-pagesource',
      testDesc: 'Ensures the source of page breaks is identified',
      resDesc: 'Add a \'dc:source\' metadata property to the Package Document',
      kbPath: 'docs/navigation/pagelist.html',
      kbTitle: 'Page Navigation',
    }));
  }
}

function check(epub, report) {
  winston.info('Checking package...');

  // normalize title property for future processing
  // TODO: Can asString() replaced by (epub.metadata['dc:title'] || '').toString().trim()
  // TODO: or it is possible that metadata['dc:title'] include more than one element?
  epub.metadata['dc:title'] = asString(epub.metadata['dc:title']);

  const assertion = new builders.AssertionBuilder()
    .withSubAssertions()
    .withTestSubject(epub.packageDoc.src, epub.metadata['dc:title']);

  // check all rules
  new Rules().all.forEach((rule) => {
    const runCheck = require(rule.check);
    if (runCheck(epub)) {
      assertion.withAssertions(newViolation(rule));
    }
  });

  var builtAssertions = assertion.build();
  report.addAssertions(builtAssertions);

  // Report the Nav Doc
  report.addEPUBNav(epub.navDoc);

  // Report package properties
  report.addProperties({
    hasManifestFallbacks: epub.hasManifestFallbacks,
    hasBindings: epub.hasBindings,
    hasSVGContentDocuments: epub.hasSVGContentDocuments,
  });

  winston.info(`- ${epub.packageDoc.src}: ${
    (builtAssertions.assertions && builtAssertions.assertions.length > 0)
      ? builtAssertions.assertions.length
      : 'No'} issues found`);

  return Promise.resolve();
}

module.exports.check = check;
