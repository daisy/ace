'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');
const colors = require('@colors/colors/safe');
const { paths } = require('@daisy/ace-config');

const { initLogger } = require('..');

// https://github.com/daisy/ace/issues/377
test('log file does not contain ANSI color codes', async () => {
  // Force colors on, as the console would have them in a terminal.
  colors.enable();

  const baseName = `ace-logger-test-${process.pid}-${Date.now()}`;
  initLogger({ fileName: `${baseName}.log`, silent: true });

  winston.warn('a warning');
  await winston.logAndWaitFinish('info', 'an info message');

  // logAndWaitFinish can resolve before the file is flushed, so wait for it.
  let logFiles = [];
  let content = '';
  for (let i = 0; i < 50 && !/an info message/.test(content); i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    logFiles = fs.readdirSync(paths.log).filter((f) => f.startsWith(baseName));
    if (logFiles.length === 1) {
      content = fs.readFileSync(path.join(paths.log, logFiles[0]), 'utf8');
    }
  }
  logFiles.forEach((f) => fs.unlinkSync(path.join(paths.log, f)));

  expect(logFiles).toHaveLength(1);

  expect(content).toMatch(/warn:\s+a warning/);
  expect(content).toMatch(/info:\s+an info message/);
  expect(content).not.toMatch(/\u001b\[/);
});
