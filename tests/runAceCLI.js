/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const path = require('path');
const spawn = require('cross-spawn');

const EXE_PATH_ELECTRON = path.resolve(__dirname, '../packages/ace-axe-runner-electron/lib/cli.js');

const EXE_PATH = process.env.AXE_ELECTRON_RUNNER ?
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
  const result = spawn.sync(
    EXE_PATH,
    process.env.AXE_ELECTRON_RUNNER ?
      [EXE_PATH_ELECTRON].concat(args) :
      args,
    { cwd, env });

  result.stdout = result.stdout && result.stdout.toString();
  result.stderr = result.stderr && result.stderr.toString();

  return result;
}

module.exports = ace;
