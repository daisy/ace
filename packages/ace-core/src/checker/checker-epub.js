'use strict';

const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

const { localize } = require('../l10n/localize').localizer;

const a11yMetadata = require('../core/a11y-metadata');

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
          resDesc)
        .withRulesetTags(['EPUB'])
        .build())
    .withResult(
      new builders.ResultBuilder('fail')
        .withDescription(ruleDesc)
        .build())
    .build();
}

function newMetadataAssertion(name, impact = 'serious') {
  return newViolation({
    impact,
    title: `metadata-${name.toLowerCase().replace('schema:', '')}`,
    testDesc: localize("checkepub.metadataviolation.testdesc", { name, interpolation: { escapeValue: false } }),
    resDesc: localize("checkepub.metadataviolation.resdesc", { name, interpolation: { escapeValue: false } }),
    kbPath: 'docs/metadata/schema.org/index.html',
    kbTitle: localize("checkepub.metadataviolation.kbtitle"),
    ruleDesc: localize("checkepub.metadataviolation.ruledesc", { name, interpolation: { escapeValue: false } })
  });
}
// newMetadataAssertion =>
// "metadataviolation"
//   "Add a '{{name}}' metadata property to the Package Document",
//   "Publications must declare the '{{name}}' metadata",
//   "Ensures a '{{name}}' metadata is present"

// otherwise custom newViolation() =>
// "metadatainvalid"
//   "Use one of the metadata values defined by schema.org",
//   "'{{name}}' metadata must be set to one of the expected values",
//   "Value '{{value}}' is invalid for '{{name}}' metadata"

function checkMetadata(assertions, epub) {
  // Check metadata values
  for (const name in a11yMetadata.A11Y_META) {
    const meta = a11yMetadata.A11Y_META[name];
    var values = epub.metadata[name];
    if (values === undefined) {
      // Report missing metadata if it is required or recommended
      if (meta.required) assertions.withAssertions(newMetadataAssertion(name));
      if (meta.recommended) assertions.withAssertions(newMetadataAssertion(name, 'moderate'));
    }
    // This causes a "earl:outcome" FAIL (not PASS), even with MINOR "earl:impact" :(
    // else if (meta.discouraged) {
    //   assertions.withAssertions(newViolation({
    //     impact: 'minor',
    //     title: `metadata-${name.toLowerCase().replace('schema:', '')}-deprecated`,
    //     testDesc: localize("checkepub.metadatadeprecated.testdesc", { name, interpolation: { escapeValue: false } }),
    //     resDesc: localize("checkepub.metadatadeprecated.resdesc", { name, interpolation: { escapeValue: false } }),
    //     kbPath: 'docs/metadata/schema.org/index.html',
    //     kbTitle: localize("checkepub.metadatadeprecated.kbtitle"),
    //     ruleDesc: localize("checkepub.metadatadeprecated.ruledesc", { name, interpolation: { escapeValue: false } })
    //   }));
    // }
    else {
      if (!Array.isArray(values)) {
        values = [values]
      }

      // TODO?
      // "metadatamultiple" would be new localizable label for this kind of error!
      //   "A single occurence of schema.org metadata is expected",
      //   "Metadata '{{name}}' should not appear more than once",
      //   "Metadata '{{name}}' with value '{{value}}' is defined several times"
      // if (name === 'schema:accessibilitySummary' && values.length > 1) {
      //   assertions.withAssertions(newViolation({
      //     impact: 'minor',
      //     title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
      //     testDesc: lxxocalize("checkepub.metadatamultiple.testdesc", { value, name, interpolation: { escapeValue: false } }),
      //     resDesc: lxxocalize("checkepub.metadatamultiple.resdesc", { name, interpolation: { escapeValue: false } }),
      //     kbPath: 'docs/metadata/schema.org/index.html',
      //     kbTitle: lxxocalize("checkepub.metadatamultiple.kbtitle"),
      //     ruleDesc: lxxocalize("checkepub.metadatamultiple.ruledesc", { name, interpolation: { escapeValue: false } })
      //   }))
      // }

      if (meta.allowedValues // effectively excludes schema:accessibilitySummary
        && !meta.discouraged) {

        values.forEach(value => {

          // comma-separated only! (not space-separated)
          // regexp note: /\s\s+/g === /\s{2,}/g
          // no whitespace collapsing, individual items can contain (incorrect) whitespaces, which will be reported
          const splitValues =
            name === 'schema:accessModeSufficient' ?
              value.trim().split(',').map(item => item.trim()).filter(item => item.length) :
              [value];

          if (meta.allowedValues) {
            splitValues.filter(splitValue => !meta.allowedValues.includes(splitValue))
            .forEach(splitValue => {
              assertions.withAssertions(newViolation({
                impact: 'moderate',
                title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
                testDesc: localize("checkepub.metadatainvalid.testdesc", { value: splitValue, name, interpolation: { escapeValue: false } }),
                resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
                kbPath: 'docs/metadata/schema.org/index.html',
                kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
                ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
              }))
            });
          }
  
          // Check consistency of the printPageNumbers feature
          if (name === 'schema:accessibilityFeature'
            && splitValues.includes('printPageNumbers')
            && !epub.navDoc.hasPageList) {
    
            assertions.withAssertions(newViolation({
              impact: 'moderate',
              title: `metadata-accessibilityFeature-printPageNumbers-nopagelist`,
              testDesc: localize("checkepub.metadataprintpagenumbers.testdesc", {}),
              resDesc: localize("checkepub.metadataprintpagenumbers.resdesc", {}),
              kbPath: 'docs/metadata/schema.org/index.html',
              kbTitle: localize("checkepub.metadataprintpagenumbers.kbtitle"),
              ruleDesc: localize("checkepub.metadataprintpagenumbers.ruledesc", {})
            }))
          }
        });
      }
    }
  }
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
    && (
      (!epub.metadata['dc:source'] || epub.metadata['dc:source'].toString() === '')
      &&
      (!epub.metadata['rendition:layout'] || epub.metadata['rendition:layout'].toString() !== "pre-paginated")
    )
  ) {
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

  winston.info(`- ${epub.packageDoc.src}: ${
    (builtAssertions.assertions && builtAssertions.assertions.length > 0)
      ? builtAssertions.assertions.length
      : 'No'} issues found`);

  return Promise.resolve();
}

module.exports.check = check;
