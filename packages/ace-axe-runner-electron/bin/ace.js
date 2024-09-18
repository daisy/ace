#!/usr/bin/env node

var electron = require('electron')

var proc = require('child_process')

var path = require('path')

// console.log(process.argv);
// console.log(process.cwd());
// console.log(__dirname);
var args = [].concat(path.resolve(__dirname, "../lib/cli.js"), process.argv.slice(2))
// console.log(args);
// --no-sandbox
// --in-process-gpu
// --disable-software-rasterizer
// --disable-gpu see app.commandLine.appendSwitch("disable-gpu") in cli.js

var child = proc.spawn(electron, args, { stdio: 'inherit', windowsHide: false })
child.on('close', function (code, signal) {
  if (code === null || code === undefined) {
    console.error(electron, 'exited with signal', signal)
    process.exit(1)
    return;
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
