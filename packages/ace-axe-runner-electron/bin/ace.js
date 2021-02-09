#!/usr/bin/env node

var electron = require('electron')

var proc = require('child_process')

var path = require('path')

// console.log(process.argv);
// console.log(process.cwd());
// console.log(__dirname);
var args = [].concat(path.resolve(__dirname, "../lib/cli.js"), process.argv.slice(2))
// console.log(args);

var child = proc.spawn(electron, args, { stdio: 'inherit', windowsHide: false })
child.on('close', function (code, signal) {
  if (code === null) {
    console.error(electron, 'exited with signal', signal)
    process.exit(1)
  }
  process.exit(code)
})

const handleTerminationSignal = function (signal) {
  process.on(signal, function signalHandler () {
    if (!child.killed) {
      child.kill(signal)
    }
  })
}

handleTerminationSignal('SIGINT')
handleTerminationSignal('SIGTERM')
