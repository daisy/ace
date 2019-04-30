'use strict';

const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

const { localize } = require('../l10n/localize').localizer;

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

function newMetadataAssertion(name, impact = 'serious') {
  return newViolation({
    impact,
    title: `metadata-${name.toLowerCase().replace(':', '-')}`,
    testDesc: localize("checkepub.metadataviolation.testdesc", { name, interpolation: { escapeValue: false } }),
    resDesc: localize("checkepub.metadataviolation.resdesc", { name, interpolation: { escapeValue: false } }),
    kbPath: 'docs/metadata/schema-org.html',
    kbTitle: localize("checkepub.metadataviolation.kbtitle"),
    ruleDesc: localize("checkepub.metadataviolation.ruledesc", { name, interpolation: { escapeValue: false } })
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
  const title = asString(epub.metadata['dc:title']);
  if (title === '') {
    assertions.withAssertions(newViolation({
      title: 'epub-title',
      testDesc: localize("checkepub.titleviolation.testdesc"),
      resDesc: localize("checkepub.titleviolation.resdesc"),
      kbPath: '',
      kbTitle: localize("checkepub.titleviolation.kbtitle"),
      ruleDesc: localize("checkepub.titleviolation.ruledesc")
    }));
  }
}

function checkPageSource(assertion, epub) {
  if (epub.navDoc.hasPageList
    && (epub.metadata['dc:source'] === undefined
    || epub.metadata['dc:source'].toString() === '')) {
    assertion.withAssertions(newViolation({
      title: 'epub-pagesource',
      testDesc: localize("checkepub.pagesourceviolation.testdesc"),
      resDesc: localize("checkepub.pagesourceviolation.resdesc"),
      kbPath: 'docs/navigation/pagelist.html',
      kbTitle: localize("checkepub.pagesourceviolation.kbtitle"),
      ruleDesc: localize("checkepub.pagesourceviolation.ruledesc")
    }));
  }
}

function check(epub, report) {
  winston.info('Checking package...');
  const assertion = new builders.AssertionBuilder()
    .withSubAssertions()
    .withTestSubject(epub.packageDoc.src, asString(epub.metadata['dc:title']));

  // Check a11y metadata
  checkMetadata(assertion, epub);

  // Check presence of a title
  checkTitle(assertion, epub);

  // Check page list is sourced
  checkPageSource(assertion, epub);

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

  // TODO: remove this debug trace
  // if (builtAssertions.assertions && builtAssertions.assertions.length > 0) {
  //   console.log(JSON.stringify(builtAssertions.assertions, null, 4));
  // }

  winston.info(`- ${epub.packageDoc.src}: ${
    (builtAssertions.assertions && builtAssertions.assertions.length > 0)
      ? builtAssertions.assertions.length
      : 'No'} issues found`);

  return Promise.resolve();
}

module.exports.check = check;
