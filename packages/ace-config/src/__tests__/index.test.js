'use strict';

const path = require('path');
const { config, paths, constants } = require('..');

test('config store is defined', () => {
  expect(config).toBeDefined();
});

test('config file default name', () => {
  expect(path.basename(config.path)).toEqual('config.json');
  expect(path.basename(path.dirname(config.path))).toEqual('DAISY Ace');
});

test('paths are defined', () => {
  expect(paths).toBeDefined();
  expect(paths.config).toBeDefined();
  expect(paths.data).toBeDefined();
  expect(paths.log).toBeDefined();
  expect(paths.temp).toBeDefined();
});

test('constants are defined', () => {
  expect(constants).toBeDefined();
});

test('constants are as in constants.json', () => {
  expect(constants.dirname).toBe('DAISY Ace');
});
