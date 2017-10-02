'use strict';

const ace = require('../runAceCLI');
const pkg = require('../../package');

const path = require('path');


test('test no input', () => {
  const { stdout, stderr, status } = ace([]);
  expect(status).toBe(1);
  expect(stderr.trim()).toMatchSnapshot();
  expect(stdout).toMatchSnapshot();
});

test('test help', () => {
  const { stdout, stderr, status } = ace(['-h']);
  expect(status).toBe(0);
  expect(stderr).toBe('');
  expect(stdout).toMatchSnapshot();
});

test('test version -v', () => {
  const { stdout, stderr, status } = ace(['-v']);
  expect(status).toBe(0);
  expect(stderr).toBe('');
  expect(stdout.trim()).toBe(pkg.version);
});

test('test version --version', () => {
  const { stdout, stderr, status } = ace(['--version']);
  expect(status).toBe(0);
  expect(stderr).toBe('');
  expect(stdout.trim()).toBe(pkg.version);
});

test('test unexisting input', () => {
  const { stdout, stderr, status } = ace(['unexisting.epub']);
  expect(status).toBe(1);
  expect(stdout.trim()).toBe('');
  expect(stderr).toMatchSnapshot();
});

test('test existing output', () => {
  const { stdout, stderr, status } = ace(['-o', 'report', 'foo'], {
    cwd: path.resolve(__dirname, '../data'),
  });
  expect(status).toBe(1);
  expect(stderr).toBe('');
  expect(stdout).toMatchSnapshot();
});
