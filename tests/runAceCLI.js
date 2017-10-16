/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const path = require('path');
const spawn = require('cross-spawn');
const babelCLIPkg = require('babel-cli/package');

const BABEL_NODE = path.join(path.dirname(require.resolve('babel-cli')), babelCLIPkg.bin['babel-node']);
const ACE_PATH = path.resolve(__dirname, '../src/cli/cli.js');

// return the result of the spawned process:
//  [ 'status', 'signal', 'output', 'pid', 'stdout', 'stderr',
//    'envPairs', 'options', 'args', 'file' ]
function ace(args, options = {}) {
  const env = options.nodePath
    ? Object.assign({}, process.env, { NODE_PATH: options.nodePath })
    : process.env;
  const cwd = options.cwd
    ? options.cwd
    : process.cwd();

  const result = spawn.sync(BABEL_NODE, ['--', ACE_PATH].concat(args || []), { cwd, env });

  result.stdout = result.stdout && result.stdout.toString();
  result.stderr = result.stderr && result.stderr.toString();

  return result;
}

module.exports = ace;
