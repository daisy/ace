'use strict';

const builders = require('./report-builders');
const pkg = require('@daisy/ace-meta/package');

describe('report builder', () => {
  let report;

  beforeEach(() => {
    report = new builders.ReportBuilder();
  });

  describe('creating a new report', () => {
    test('new report is well formed', () => {
      expect(report).toBeDefined();
      expect(report.build()).toBeDefined();
      expect(report.build()).toMatchObject({
        '@type': 'earl:report',
        '@context': 'http://daisy.github.io/ace/ace-report-1.0.jsonld',
        'dct:title': 'Ace Report',
        'dct:description': 'Report on automated accessibility checks for EPUB',
        'earl:assertedBy': {
          '@type': 'earl:software',
          'doap:name': 'DAISY Ace',
          'doap:description': 'DAISY Accessibility Checker for EPUB',
          'doap:homepage': 'http://daisy.github.io/ace',
          'doap:created': '2017-07-01',
          'doap:release': { 'doap:revision': pkg.version },
        },
      });
      expect(report.build().data).toBeDefined();
      expect(report.build().outlines).toBeDefined();
      expect(report.build().properties).toBeDefined();
      expect(report.build().assertions).toBeUndefined();
    });
    test('new report args are used', () => {
      report = new builders.ReportBuilder('Title', 'Desc');
      expect(report).toBeDefined();
      expect(report.build()).toBeDefined();
      expect(report.build()).toMatchObject({
        'dct:title': 'Title',
        'dct:description': 'Desc',
      });
    });
    test('new report undefined args are ignored', () => {
      report = new builders.ReportBuilder(undefined, undefined);
      expect(report).toBeDefined();
      expect(report.build()).toBeDefined();
      expect(report.build()).toMatchObject({
        'dct:title': 'Ace Report',
        'dct:description': 'Report on automated accessibility checks for EPUB',
      });
    });
    test('new report null args contains empty string values', () => {
      report = new builders.ReportBuilder(null, null);
      expect(report).toBeDefined();
      expect(report.build()).toBeDefined();
      expect(report.build()).toMatchObject({
        'dct:title': '',
        'dct:description': '',
      });
    });
    test('new report with object args contains toString values', () => {
      report = new builders.ReportBuilder({}, {});
      expect(report).toBeDefined();
      expect(report.build()).toBeDefined();
      expect(report.build()).toMatchObject({
        'dct:title': '[object Object]',
        'dct:description': '[object Object]',
      });
    });
  });

  describe('withAssertions', () => {
    let assertions;
    test('adding null assertion is ignored', () => {
      expect(report.withAssertions(null)).toBeDefined();
      expect(report.build().assertions).toBeUndefined();
    });
    test('adding undefined assertion is ignored', () => {
      expect(report.withAssertions(undefined)).toBeDefined();
      expect(report.build().assertions).toBeUndefined();
    });
    test('adding single assertion to empty report creates a new array', () => {
      expect(report.withAssertions({ foo: 'foo' })).toBeDefined();
      assertions = report.build().assertions;
      expect(assertions).toBeDefined();
      expect(Array.isArray(assertions)).toBe(true);
      expect(assertions.length).toBe(1);
      expect(assertions[0]).toEqual({ foo: 'foo' });
    });
    test('adding single assertion adds to existing assertions', () => {
      expect(report.withAssertions({ foo: 'foo' })).toBeDefined();
      assertions = report.build().assertions;
      expect(assertions).toBeDefined();
      expect(Array.isArray(assertions)).toBe(true);
      expect(assertions.length).toBe(1);
      expect(assertions[0]).toEqual({ foo: 'foo' });
    });
    test('adding assertions array to empty report copies it to the report', () => {
      expect(report.withAssertions([
        { foo: 'foo' }, { foo: 'foo' },
      ])).toBeDefined();
      assertions = report.build().assertions;
      expect(assertions).toBeDefined();
      expect(Array.isArray(assertions)).toBe(true);
      expect(assertions.length).toBe(2);
      expect(assertions[0]).toEqual({ foo: 'foo' });
    });
    test('adding assertions array concatenates to existing array', () => {
      expect(report.withAssertions({ bar: 'bar' })).toBeDefined();
      expect(report.withAssertions([
        { foo: 'foo' }, { foo: 'foo' },
      ])).toBeDefined();
      assertions = report.build().assertions;
      expect(assertions).toBeDefined();
      expect(Array.isArray(assertions)).toBe(true);
      expect(assertions.length).toBe(3);
      expect(assertions[0]).toEqual({ bar: 'bar' });
      expect(assertions[1]).toEqual({ foo: 'foo' });
    });
  });

  describe('withData', () => {
    let data;
    beforeEach(() => {
      data = report.build().data;
    });
    test('adding null data` is ignored', () => {
      expect(report.withData(null)).toBeDefined();
      expect(data).toEqual({});
    });
    test('adding undefined data is ignored', () => {
      expect(report.withData(undefined)).toBeDefined();
      expect(data).toEqual({});
    });
    test('adding data to new report populates the data section', () => {
      expect(report.withData({ foo: 'foo' })).toBeDefined();
      expect(data).toEqual({ foo: 'foo' });
    });
    test('adding data is merged in existing data', () => {
      expect(report.withData({ foo: 'foo' })).toBeDefined();
      expect(report.withData({ bar: 'bar' })).toBeDefined();
      expect(data).toEqual({ foo: 'foo', bar: 'bar' });
    });
    test('adding data overrides existing scalar data', () => {
      expect(report.withData({ foo: 'foo' })).toBeDefined();
      expect(report.withData({ foo: 'bar' })).toBeDefined();
      expect(data).toEqual({ foo: 'bar' });
    });
    test('adding data adds to existing array data', () => {
      expect(report.withData({ foo: ['foo'] })).toBeDefined();
      expect(report.withData({ foo: ['bar'] })).toBeDefined();
      expect(data).toEqual({ foo: ['foo', 'bar'] });
    });
  });

  describe('withProperties', () => {
    let properties;
    beforeEach(() => {
      properties = report.build().properties;
    });
    test('adding null properties` is ignored', () => {
      expect(report.withProperties(null)).toBeDefined();
      expect(properties).toEqual({});
    });
    test('adding undefined properties is ignored', () => {
      expect(report.withProperties(undefined)).toBeDefined();
      expect(properties).toEqual({});
    });
    test('adding properties to new report populates the properties section', () => {
      expect(report.withProperties({ foo: true })).toBeDefined();
      expect(properties).toEqual({ foo: true });
    });
    test('adding properties augments existing properties', () => {
      expect(report.withProperties({ foo: true })).toBeDefined();
      expect(report.withProperties({ bar: true })).toBeDefined();
      expect(properties).toEqual({ foo: true, bar: true });
    });
    test('adding properties keeps existing true properties', () => {
      expect(report.withProperties({ foo: true })).toBeDefined();
      expect(report.withProperties({ foo: false })).toBeDefined();
      expect(properties).toEqual({ foo: true });
    });
    test('adding properties booleanizes values', () => {
      expect(report.withProperties({ foo: 'hello', bar: null })).toBeDefined();
      expect(properties).toEqual({ foo: true, bar: false });
    });
    test('adding properties booleanizes values when overrinding too', () => {
      expect(report.withProperties({ foo: false })).toBeDefined();
      expect(report.withProperties({ foo: [] })).toBeDefined();
      expect(properties).toEqual({ foo: true });
    });
  });

  describe('withTestSubject', () => {
    test('with URL', () => {
      expect(report.withTestSubject('https://example.com')).toBeDefined();
      const testSubject = report.build()['earl:testSubject'];
      expect(testSubject).toBeDefined();
      expect(testSubject).toEqual({
        url: 'https://example.com'
      })
    });
    test('with title', () => {
      expect(report.withTestSubject('https://example.com', 'title')).toBeDefined();
      const testSubject = report.build()['earl:testSubject'];
      expect(testSubject).toBeDefined();
      expect(testSubject).toEqual({
        url: 'https://example.com',
        'dct:title': 'title',
      })
    });
    test('with identifier', () => {
      expect(report.withTestSubject('https://example.com', '', 'uid')).toBeDefined();
      const testSubject = report.build()['earl:testSubject'];
      expect(testSubject).toBeDefined();
      expect(testSubject).toEqual({
        url: 'https://example.com',
        'dct:identifier': 'uid',
      })
    });
    test('with metadata null', () => {
      expect(report.withTestSubject('https://example.com', '', '', null)).toBeDefined();
      const testSubject = report.build()['earl:testSubject'];
      expect(testSubject).toBeDefined();
      expect(testSubject).toEqual({
        url: 'https://example.com',
      })
    });
    test('with metadata', () => {
      expect(report.withTestSubject('https://example.com', '', '', { foo: 'bar' })).toBeDefined();
      const testSubject = report.build()['earl:testSubject'];
      expect(testSubject).toBeDefined();
      expect(testSubject).toEqual({
        url: 'https://example.com',
        metadata: { foo: 'bar' }
      })
    });

    test('with link null', () => {
      expect(report.withTestSubject('https://example.com', '', '', null, null)).toBeDefined();
      const testSubject = report.build()['earl:testSubject'];
      expect(testSubject).toBeDefined();
      expect(testSubject).toEqual({
        url: 'https://example.com',
      })
    });
    test('with links', () => {
      expect(report.withTestSubject('https://example.com', '', '', null, { foo: 'bar' })).toBeDefined();
      const testSubject = report.build()['earl:testSubject'];
      expect(testSubject).toBeDefined();
      expect(testSubject).toEqual({
        url: 'https://example.com',
        links: { foo: 'bar' }
      })
    });
  });
});
