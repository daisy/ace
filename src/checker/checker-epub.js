'use strict';

const builders = require('../report/report-builders.js');
const winston = require('winston');
const glob = require('glob');

const ASSERTED_BY = 'Ace';
const MODE = 'automatic';
const KB_BASE = 'http://kb.daisy.org/publishing/';

const checks = [];

function validateCheck() {
  // TODO: impl check validator
  return true;
}

// use glob patterns to parse checks
const files = glob.sync('./**/*.json', { cwd: './src/checker' });
files.forEach((file) => {
  const checkOject = require(file);
  if (validateCheck(checkOject)) { checks.push(checkOject); }
});

// console.log(JSON.stringify(checks));


function asString(arrayOrString) {
  if (Array.isArray(arrayOrString) && arrayOrString.length > 0) {
    return asString(arrayOrString[0]);
  } else if (arrayOrString !== undefined) {
    return arrayOrString.toString().trim();
  }
  return '';
}

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
        .withRulesetTags(['EPUB'])
        .build())
    .withResult(
      new builders.ResultBuilder('fail')
        .withDescription(resDesc)
        .build())
    .build();
}

function check(epub, report) {
  winston.info('Checking package...');
  const assertion = new builders.AssertionBuilder()
    .withSubAssertions()
    .withTestSubject(epub.packageDoc.src, asString(epub.metadata['dc:title']));

  // run all "checks"
  checks.forEach((checkObject) => {
    const run = require(checkObject.audit);
    if (run(epub)) { assertion.withAssertions(newViolation(checkObject)); }
  });

  report.addAssertions(assertion.build());

  // Report the Nav Doc
  report.addEPUBNav(epub.navDoc);

  // Report package properties
  report.addProperties({
    hasManifestFallbacks: epub.hasManifestFallbacks,
    hasBindings: epub.hasBindings,
  });

  return Promise.resolve();
}

module.exports.check = check;
