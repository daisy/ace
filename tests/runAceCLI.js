'use strict';

const path = require('path');
const spawn = require('cross-spawn'); // eslint-disable-line import/no-extraneous-dependencies

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

  const result = spawn.sync(ACE_PATH, args || [], { cwd, env });

  result.stdout = result.stdout && result.stdout.toString();
  result.stderr = result.stderr && result.stderr.toString();

  return result;
}

module.exports = ace;
