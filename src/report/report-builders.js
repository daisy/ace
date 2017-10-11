/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-use-before-define: ["error", { "classes": false }] */

'use strict';

const pkg = require('../../package');

// static
const ACE_DESCRIPTION = {
  '@type': 'earl:software',
  'doap:name': 'DAISY Ace',
  'doap:description': 'DAISY Accessibility Checker for EPUB',
  'doap:homepage': 'http://daisy.github.io/ace',
  'doap:created': '2017-07-01',
  'doap:release': { 'doap:revision': pkg.version },
};

function calculateResult(assertions) {
  let outcome = 'pass';
  assertions.forEach((assertion) => {
    if ('earl:result' in assertion &&
        assertion['earl:result']['earl:outcome'] === 'fail') {
      outcome = 'fail';
    }
  });
  return new ResultBuilder(outcome).build();
}

// add an assertion and recalc the top-level result
function withAssertions(obj, assertions) {
  if (!('assertions' in obj)) obj.assertions = [];
  obj.assertions = obj.assertions.concat(assertions);
  obj['earl:result'] = calculateResult(obj.assertions);
  return obj;
}

function withTestSubject(obj, url, title = '', identifier = '', metadata = null) {
  const testSubject = { url };
  if (title.length > 0) testSubject['dct:title'] = title;
  if (identifier.length > 0) testSubject['dct:identifier'] = identifier;
  if (metadata !== undefined && metadata != null) testSubject.metadata = metadata;
  obj['earl:testSubject'] = testSubject;
  return obj;
}


class AssertionBuilder {
  constructor() {
    this._json = { '@type': 'earl:assertion' };
  }
  build() {
    return this._json;
  }
  withAssertedBy(assertor) {
    this._json['earl:assertedBy'] = assertor;
    return this;
  }
  withAssertions(assertions) {
    withAssertions(this._json, assertions);
    return this;
  }
  withMode(mode) {
    this._json['earl:mode'] = mode;
    return this;
  }
  withResult(result) {
    this._json['earl:result'] = result;
    return this;
  }
  withSubAssertions() {
    this._json.assertions = this._json.assertions || [];
    return this;
  }
  withTest(test) {
    this._json['earl:test'] = test;
    return this;
  }
  withTestSubject(url, title) {
    withTestSubject(this._json, url, title);
    return this;
  }
}


class ReportBuilder {
  constructor(
    title = 'Ace Report',
    description = 'Report on automated accessibility checks for EPUB',
    ) {
    this._json = {
      '@type': 'earl:report',
      '@context': 'http://ace.daisy.org/ns/ace-report.jsonld',
      'dct:title': (title == null) ? '' : title.toString(),
      'dct:description': (title == null) ? '' : description.toString(),
      'dct:date': new Date().toLocaleString(),
      'earl:assertedBy': ACE_DESCRIPTION,
      outlines: {},
      data: {},
      properties: {},
    };
  }
  build() {
    return this._json;
  }
  withA11yMeta(metadata) {
    if (!metadata) return this;
    this._json['a11y-metadata'] = metadata;
    return this;
  }
  withAssertions(assertions) {
    if (!assertions) return this;
    withAssertions(this._json, assertions);
    return this;
  }
  withData(data) {
    if (!data) return this;
    Object.getOwnPropertyNames(data).forEach((key) => {
      if (Array.isArray(this._json.data[key])) {
        this._json.data[key] = this._json.data[key].concat(data[key]);
      } else {
        this._json.data[key] = data[key];
      }
    });
    return this;
  }
  withEPUBOutline(outline) {
    if (!outline) return this;
    this._json.outlines.toc = outline;
    return this;
  }
  withHeadingsOutline(outline) {
    if (!outline) return this;
    this._json.outlines.headings = outline;
    return this;
  }
  withHTMLOutline(outline) {
    if (!outline) return this;
    this._json.outlines.html = outline;
    return this;
  }
  withProperties(properties) {
    if (!properties) return this;
    Object.getOwnPropertyNames(properties).forEach((key) => {
      this._json.properties[key] = (key in this._json.properties)
        ? this._json.properties[key] || Boolean(properties[key])
        : Boolean(properties[key]);
    });
    return this;
  }
  withTestSubject(url, title, identifier, metadata) {
    withTestSubject(this._json, url, title, identifier, metadata);
    return this;
  }
}

class ResultBuilder {
  constructor(outcome) {
    this._json = { 'earl:outcome': outcome };
  }
  build() {
    return this._json;
  }
  withDescription(description) {
    this._json['dct:description'] = description;
    return this;
  }
  withPointer(css, cfi) {
    this._json['earl:pointer'] = { cfi, css };
    return this;
  }
}

class TestBuilder {
  constructor() {
    this._json = {};
  }
  build() {
    return this._json;
  }
  withImpact(impact) {
    this._json['earl:impact'] = impact;
    return this;
  }
  withTitle(title) {
    this._json['dct:title'] = title;
    return this;
  }
  withDescription(description) {
    this._json['dct:description'] = description;
    return this;
  }
  withHelp(url, title) {
    this._json.help = { url, title };
    return this;
  }
}

module.exports.AssertionBuilder = AssertionBuilder;
module.exports.ReportBuilder = ReportBuilder;
module.exports.TestBuilder = TestBuilder;
module.exports.ResultBuilder = ResultBuilder;
