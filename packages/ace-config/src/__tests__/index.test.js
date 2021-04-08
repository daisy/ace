'use strict';

const path = require('path');
const { config, paths, constants } = require('..');

test('config store is defined', () => {
  expect(config).toBeDefined();
});

test('config file default name', () => {
  expect(path.basename(config.path)).toEqual('config.json');
  if (process.platform === "win32") {
    // https://github.com/sindresorhus/env-paths/blob/5944db4b2f8c635e8b39a363f6bdff40825be16e/index.js#L28
    expect(path.basename(path.dirname(path.dirname(config.path)))).toEqual('DAISY Ace');
    expect(path.basename(path.dirname(config.path))).toEqual('Config');
  } else {
    expect(path.basename(path.dirname(config.path))).toEqual('DAISY Ace');
  }
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
