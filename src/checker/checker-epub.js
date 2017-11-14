'use strict';

const builders = require('../report/report-builders.js');

const winston = require('winston');
const glob = require('glob');
const path = require('path');

const ASSERTED_BY = 'Ace';
const MODE = 'automatic';
const KB_BASE = 'http://kb.daisy.org/publishing/';
const RULE_BASE_PATH = './src/checker';

const rules = [];
const ruleProperties = ['title', 'testDesc', 'kbTitle', 'resDesc', 'kbPath', 'impact', 'tag', 'spec', 'check'];

function isRuleFormatValid(rule) {
  if (Object.keys(rule).length !== ruleProperties.length) {
    winston.error(`Rule format not valid: \n${JSON.stringify(rule)}`);
    return false;
  }
  ruleProperties.forEach((prop) => {
    if (!Object.prototype.hasOwnProperty.call(rule, prop)) {
      winston.error(`Property ${prop} not found! \n${JSON.stringify(rule)}`);
      return false;
    }
    return true;
  });

  if (rule.check.toString().length === 0) {
    winston.error(`Rule-property 'check' should never be empty. \n${JSON.stringify(rule)}`);
    return false;
  }
  return true;
}

// use glob patterns to parse rules
const files = glob.sync('./**/*.json', { cwd: RULE_BASE_PATH });
files.forEach((file) => {
  const rule = require(file);
  if (isRuleFormatValid(rule)) {
    rule.check = path.resolve(RULE_BASE_PATH, path.dirname(file), rule.check);
    rules.push(rule);
  }/* else TODO: Format of any rule is not valid. Stop the whole processing?
       process.exit(1);
  */
});

// console.log(JSON.stringify(rules));


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

  // normalize title property for future processing
  // TODO: Can asString() replaced by (epub.metadata['dc:title'] || '').toString().trim()
  // TODO: or it is possible that metadata['dc:title'] include more than one element?
  epub.metadata['dc:title'] = asString(epub.metadata['dc:title']);

  const assertion = new builders.AssertionBuilder()
    .withSubAssertions()
    .withTestSubject(epub.packageDoc.src, epub.metadata['dc:title']);

  // check all rules
  rules.forEach((rule) => {
    const runCheck = require(rule.check);
    if (runCheck(epub)) {
      assertion.withAssertions(newViolation(rule));
    }
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
