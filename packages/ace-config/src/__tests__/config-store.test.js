'use strict';

const ConfigStore = require('../config-store');
const tmp = require('tmp');

tmp.setGracefulCleanup();

let conf;
const fixture = {
  a: 1,
  b: [2, 2],
  c: { x: 3, y: 3 },
};

beforeEach(() => {
  conf = new ConfigStore({ cwd: tmp.dirSync({ unsafeCleanup: true }).name });
});

test('config store is defined', () => {
  expect(ConfigStore).toBeDefined();
});

test('.get 2-args to work as in parent', () => {
  expect(conf.get('foo')).not.toBeDefined();
  expect(conf.get('foo', 'bar')).toBe('bar');
  conf.set('foo', fixture);
  expect(conf.get('foo')).toEqual(fixture);
});

test('.get to ignore null or false merge mode', () => {
  conf.set('foo', fixture);
  expect(conf.get('foo', { d: 4 }, null)).toEqual(fixture);
  expect(conf.get('foo', { d: 4 }, false)).toEqual(fixture);
});

test('.get merge mode to merge the defaults', () => {
  conf.set('foo', fixture);
  expect(conf.get('foo', { c: { z: 3 } }, true)).toEqual({
    a: 1,
    b: [2, 2],
    c: { x: 3, y: 3, z: 3 },
  });
});

test('.get merge mode override the defaults', () => {
  conf.set('foo', fixture);
  expect(conf.get('foo', { a: 'foo' }, true)).toEqual(fixture);
  expect(conf.get('foo', { c: { x: 'foo' } }, true)).toEqual(fixture);
});

test('.get merge mode ignores non-object defaults', () => {
  conf.set('foo', fixture);
  expect(conf.get('foo', 'foo', true)).toEqual(fixture);
  expect(conf.get('foo', null, true)).toEqual(fixture);
});

test('.get merge mode concatenates arrays', () => {
  conf.set('foo', fixture);
  expect(conf.get('foo', { b: ['x'] }, true)).toMatchObject({ b: ['x', 2, 2] });
});
