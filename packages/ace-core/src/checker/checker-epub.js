'use strict';

const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

const { localize } = require('../l10n/localize').localizer;

const ASSERTED_BY = 'Ace';
const MODE = 'automatic';
const KB_BASE = 'http://kb.daisy.org/publishing/';

const A11Y_META = {
  'schema:accessMode': {
    required: true,
    allowedValues: [
      'auditory',
      'chartOnVisual',
      'chemOnVisual',
      'colorDependent',
      'diagramOnVisual',
      'mathOnVisual',
      'musicOnVisual',
      'tactile',
      'textOnVisual',
      'textual',
      'visual',
    ]
  },
  'schema:accessModeSufficient': {
    recommended: true,
    allowedValues: [
      'auditory',
      'tactile',
      'textual',
      'visual',
    ]
  },
  'schema:accessibilityAPI': {
    allowedValues: [
      'ARIA'
    ]
  },
  'schema:accessibilityControl': {
    allowedValues: [
      'fullKeyboardControl',
      'fullMouseControl',
      'fullSwitchControl',
      'fullTouchControl',
      'fullVideoControl',
      'fullVoiceControl',
    ]
  },
  'schema:accessibilityFeature': {
    required: true,
    allowedValues: [
      'alternativeText',
      'annotations',
      'audioDescription',
      'bookmarks',
      'braille',
      'captions',
      'ChemML',
      'describedMath',
      'displayTransformability',
      'highContrastAudio',
      'highContrastDisplay',
      'index',
      'largePrint',
      'latex',
      'longDescription',
      'MathML',
      'none',
      'printPageNumbers',
      'readingOrder',
      'rubyAnnotations',
      'signLanguage',
      'structuralNavigation',
      'synchronizedAudioText',
      'tableOfContents',
      'taggedPDF',
      'tactileGraphic',
      'tactileObject',
      'timingControl',
      'transcript',
      'ttsMarkup',
      'unlocked',
    ],
  },
  'schema:accessibilityHazard': {
    allowedValues: [
      'flashing',
      'noFlashingHazard',
      'motionSimulation',
      'noMotionSimulationHazard',
      'sound',
      'noSoundHazard',
      'unknown',
      'none',
    ]
  },
  'schema:accessibilitySummary': {
    required: true,
  }
};

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
    kbPath: 'docs/metadata/schema-org.html',
    kbTitle: localize("checkepub.metadataviolation.kbtitle"),
    ruleDesc: localize("checkepub.metadataviolation.ruledesc", { name, interpolation: { escapeValue: false } })
  });
}

function checkMetadata(assertions, epub) {
  // Check metadata values
  for (const name in A11Y_META) {
    const meta = A11Y_META[name];
    var values = epub.metadata[name];
    if (values === undefined) {
      // Report missing metadata if it is required or recommended
      if (meta.required) assertions.withAssertions(newMetadataAssertion(name));
      if (meta.recommended) assertions.withAssertions(newMetadataAssertion(name, 'moderate'));
    } else {
      if (!Array.isArray(values)) {
        values = [values]
      }
      // Parse list values
      values = values.map(value => value.trim().replace(',', ' ').replace(/\s{2,}/g, ' ').split(' '))
      values = [].concat(...values);
      // Check metadata values are allowed
      // see https://www.w3.org/wiki/WebSchemas/Accessibility
      if (meta.allowedValues) {
        values.filter(value => !meta.allowedValues.includes(value))
        .forEach(value => {
          assertions.withAssertions(newViolation({
            impact: 'moderate',
            title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
            testDesc: localize("checkepub.metadatainvalid.testdesc", { value, name, interpolation: { escapeValue: false } }),
            resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
            kbPath: 'docs/metadata/schema-org.html',
            kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
            ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
          }))
        });
      }
      // Check consistency of the printPageNumbers feature
      if (name === 'schema:accessibilityFeature' 
      && values.includes('printPageNumbers')
      && !epub.navDoc.hasPageList) {
        assertions.withAssertions(newViolation({
          impact: 'moderate',
          title: `metadata-accessibilityFeature-printPageNumbers-nopagelist`,
          testDesc: localize("checkepub.metadataprintpagenumbers.testdesc", {}),
          resDesc: localize("checkepub.metadataprintpagenumbers.resdesc", {}),
          kbPath: 'docs/metadata/schema-org.html',
          kbTitle: localize("checkepub.metadataprintpagenumbers.kbtitle"),
          ruleDesc: localize("checkepub.metadataprintpagenumbers.ruledesc", {})
        }))
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

  winston.info(`- ${epub.packageDoc.src}: ${
    (builtAssertions.assertions && builtAssertions.assertions.length > 0)
      ? builtAssertions.assertions.length
      : 'No'} issues found`);

  return Promise.resolve();
}

module.exports.check = check;
