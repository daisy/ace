'use strict';

const path = require('path');
const stripAnsi = require('strip-ansi');

const ace = require('../runAceCLI');
const pkg = require('@daisy/ace-meta/package');

// console.log(`##${stderr}##`);
// console.log(`##${stripAnsi(stderr)}##`);
// const map = {  // Special characters
//   '\\': '\\',
//   '\n': 'n',
//   '\r': 'r',
//   '\t': 't'
// };
// let str = stderr.replace(/[\\\n\r\t]/g, function(i) {
//     return '\\'+map[i];
// });
// str = str.replace(/[^ -~]/g, function(i){
//     return '\\u'+("000" + i.charCodeAt(0).toString(16)).slice(-4);
// });
// console.log(`##${str}##`);

describe('Running the CLI', () => {
  test('with no input should fail', () => {
    const { stdout, stderr, status } = ace([]);
    expect(status).toBe(1);
    expect(stderr.trim()).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });

  test('with the -h option should print help', () => {
    const { stdout, stderr, status } = ace(['-h']);
    expect(status).toBe(0);
    expect(stderr).toBe('');
    expect(stdout).toMatchSnapshot();
  });

  test('with the -v option should print the version number', () => {
    const { stdout, stderr, status } = ace(['-v']);
    expect(status).toBe(0);
    expect(stderr).toBe('');
    expect(stdout.trim()).toBe(pkg.version);
  });

  test('with the --version option should print the version number', () => {
    const { stdout, stderr, status } = ace(['--version']);
    expect(status).toBe(0);
    expect(stderr).toBe('');
    expect(stdout.trim()).toBe(pkg.version);
  });

  test('on a non-existant document should fail', () => {
    const { stdout, stderr, status } = ace(['unexisting.epub']);
    expect(status).toBe(1);
    expect(stdout.trim()).toMatchSnapshot();
    expect(stderr).toMatchSnapshot();
  });

  test('with -o pointing to an existing directory should fail', () => {
    const { stdout, stderr, status } = ace(['-o', 'report', 'foo'], {
      cwd: path.resolve(__dirname, '../data'),
    });
    expect(status).toBe(1);
    expect(stderr).toBe('');
    expect(stdout).toMatchSnapshot();
  });

  test('with --silent and no --outdir should print the JSON report to standard output', () => {
    const { stdout, stderr, status } = ace(['-s', 'base-epub-30'], {
      cwd: path.resolve(__dirname, '../data'),
    });
    expect(status).toBe(0);

    // https://github.com/electron/electron/issues/18397
    // https://www.electronjs.org/releases/stable#breaking-changes-1400
    expect(stderr).toBe(false && process.env.AXE_ELECTRON_RUNNER ? `(electron) The default value of app.allowRendererProcessReuse is deprecated, it is currently "false".  It will change to be "true" in Electron 9.  For more information please check https://github.com/electron/electron/issues/18397
` : '');
    expect(() => JSON.parse(stdout)).not.toThrow(SyntaxError);
    const res = JSON.parse(stdout);
    expect(res).toMatchObject({ '@type': 'earl:report' });
  });

  describe('with a valid input', () => {
    test('raises no log warnings', () => {
      const { stdout, stderr, status } = ace(['base-epub-30'], {
        cwd: path.resolve(__dirname, '../data'),
      });
      const log = stripAnsi(stdout);
      expect(/^warn:/m.test(log)).toBe(false);
    });
    test('prints the "Done" info', () => {
      const { stdout, stderr, status } = ace(['base-epub-30'], {
        cwd: path.resolve(__dirname, '../data'),
      });
      const log = stripAnsi(stdout);
      expect(/^info:\s+Done/m.test(log)).toBe(true);
    });
  });

  describe('raises a warning', () => {
    test('when the EPUB Content Docs have unusual extensions', () => {
      const { stdout, stderr, status } = ace(['issue-122'], {
        cwd: path.resolve(__dirname, '../data'),
      });
      const log = stripAnsi(stdout);

      // The Electron-based Axe runner handles .xml files just fine
      const condition = process.env.AXE_ELECTRON_RUNNER ? true : /^warn:\s+Copying document with extension/m.test(log);
      expect(condition).toBe(true);
    });

    test('when the EPUB contains SVG Content Documents', () => {
      const { stdout, stderr, status } = ace(['feat-svg'], {
        cwd: path.resolve(__dirname, '../data'),
      });
      const log = stripAnsi(stdout);
      expect(/^warn:\s+The SVG Content Documents in this EPUB will be ignored\./m.test(log)).toBe(true);
    });
  });

  describe('does not raise a warning', () => {
    test('when a named character reference is used in XHTML', () => {
      const { stdout, stderr, status } = ace(['issue-182'], {
        cwd: path.resolve(__dirname, '../data'),
      });
      const log = stripAnsi(stdout);
      expect(/^warn:\s+\[xmldom error\]	entity not found/m.test(log)).toBe(false);
    });
  });

  /*test('with return-2-on-validation-error set to true should exit with return code 2', () => {
    // TODO this test won't work until we can specify the CLI option to enable returning 2 on violation(s)
    const { stdout, stderr, status } = ace(['has-violations'], {
      cwd: path.resolve(__dirname, '../data')
    });
    expect(status).toBe(2);
  });*/
});
