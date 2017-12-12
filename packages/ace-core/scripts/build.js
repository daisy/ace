'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { config } = require('../../../scripts/build-utils');

function buildH5O() {
  /**
   * Wrap the browserified h5o in a function to temporarily undefine 'define'
   * since Browserify and RequireJS otherwise don’t go along
   * see: https://github.com/browserify/browserify/issues/790
   */
  const vendorDir = path.resolve(__dirname, '..', config.buildDir, 'scripts/vendor');
  const srcPath = path.resolve(require.resolve('h5o'), '../dist/outliner.min.js');
  const destPath = path.resolve(vendorDir, 'outliner.min.js');

  mkdirp.sync(path.dirname(destPath));
  const ws = fs.createWriteStream(destPath);
  const rs = fs.createReadStream(srcPath);
  ws.write('(function () { var define = undefined;');
  rs.pipe(ws, { end: false });
  rs.on('end', () => {
    ws.end('})();');
  });
}

buildH5O();

