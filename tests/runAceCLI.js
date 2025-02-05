/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const path = require('path');
const spawn = require('cross-spawn');
// const spawnSync = require('child_process').spawnSync;

const EXE_PATH_ELECTRON = path.resolve(__dirname, '../packages/ace-axe-runner-electron/lib/cli.js');

const EXE_PATH = process.env.AXE_ELECTRON_RUNNER ?
  // path.resolve(__dirname, '../node_modules/.bin/electron.cmd') :
  path.resolve(__dirname, '../node_modules/electron/cli.js') :
  path.resolve(__dirname, '../packages/ace-cli/bin/ace.js');

// return the result of the spawned process:
//  [ 'status', 'signal', 'output', 'pid', 'stdout', 'stderr',
//    'envPairs', 'options', 'args', 'file' ]
function ace(args, options = {}) {

  const env = options.nodePath
    ? Object.assign({}, process.env, { NODE_PATH: options.nodePath })
    : Object.assign({}, process.env);

  if (typeof env.ELECTRON_RUN_AS_NODE !== "undefined") delete env.ELECTRON_RUN_AS_NODE;

  const cwd = options.cwd
    ? options.cwd
    : process.cwd();

  args = args || [];

  // const func = process.env.AXE_ELECTRON_RUNNER ? spawnSync : spawn.sync;
  const func = spawn.sync;

  const result = func(
    process.env.AXE_ELECTRON_RUNNER ? "node" : EXE_PATH,
    process.env.AXE_ELECTRON_RUNNER ?
      [EXE_PATH, EXE_PATH_ELECTRON].concat("--disable-gpu").concat(args) :
      args,
    {
      cwd,
      env,
      // shell: true,
      // windowsHide: false,
      // detached: true,
      // stdio: ['pipe', 'pipe', 'pipe']
      // stdio: ['inherit', 'inherit', 'inherit']
      // stdio: [process.stdin, process.stdout, process.stderr]
      // stdio: ['pipe', 'pipe', process.stderr]
    });

  result.stdout = result.stdout && result.stdout.toString();

  // Windows bug: https://github.com/electron/electron/issues/17244
  result.stderr = result.stderr && result.stderr.toString();

  return result;
}

module.exports = ace;
