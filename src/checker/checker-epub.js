'use strict';

const builders = require('../report/report-builders.js');
const winston = require('winston');

const ASSERTED_BY = 'Ace';
const MODE = 'automatic';
const KB_BASE = 'https://daisy.github.io/a11y-kb/';

function newViolation({ impact = 'serious', title, testDesc, resDesc, kbPath, kbTitle }) {
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
          kbTitle)
        .build())
    .withResult(
      new builders.ResultBuilder('fail')
        .withDescription(resDesc)
        .build())
    .build();
}

function newMetadataAssertion(name, impact = 'serious') {
  return newViolation({
    impact,
    title: `metadata-${name.toLowerCase().replace(':', '-')}`,
    testDesc: `Ensures a '${name}' metadata is present`,
    resDesc: `Add a '${name}' metadata property to the Package Document`,
    kbPath: 'docs/metadata/schema-org.html',
    kbTitle: 'Schema.org Accessibility Metadata',
  });
}

function checkMetadata(assertions, epub) {
  // Required metadata
  [
    'schema:accessMode',
    'schema:accessibilityFeature',
    'schema:accessibilitySummary',
  ].filter(meta => epub.metadata[meta] === undefined)
    .forEach(meta => assertions.withAssertions(newMetadataAssertion(meta)));
  // Recommended metadata
  [
    'schema:accessModeSufficient',
  ].filter(meta => epub.metadata[meta] === undefined)
    .forEach(meta => assertions.withAssertions(newMetadataAssertion(meta, 'moderate')));
}

function checkTitle(assertions, epub) {
  const title = epub.metadata['dc:title'];
  if (title === undefined || title.trim() === '') {
    assertions.withAssertions(newViolation({
      title: 'epub-title',
      testDesc: 'Ensures the EPUB has a title',
      resDesc: 'Add a \'dc:title\' metadata property to the Package Document',
      kbPath: '',
      kbTitle: 'EPUB Title',
    }));
  }
}

function checkPageSource(assertion, epub) {
  if (epub.navDoc.hasPageList
    && (epub.metadata['dc:source'] === undefined
    || epub.metadata['dc:source'].trim() === '')) {
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
  const assertion = new builders.AssertionBuilder()
    .withSubAssertions()
    .withTestSubject(
      epub.packageDoc.src,
      (epub.metadata['dc:title'] !== undefined) ? epub.metadata['dc:title'] : '');

  // Check a11y metadata
  checkMetadata(assertion, epub);

  // Check presence of a title
  checkTitle(assertion, epub);

  // Check page list is sourced
  checkPageSource(assertion, epub);

  report.addAssertions(assertion.build());
// Report the Nav Doc
  report.addEPUBNav(epub.navDoc);
  return Promise.resolve();
}

module.exports.check = check;
