'use strict';

const epubParse = require('./epub-parse.js');
const unzip = require('extract-zip');
const tmp = require('tmp');

function EPUB(path) {
  this.path = path;
}

EPUB.prototype.extract = function extract() {
  tmp.setGracefulCleanup(); // remove tmpdir automatically upon process exit
  const tmpdir = tmp.dirSync({ unsafeCleanup: true }); // remove even when not empty
  console.log('Unzipping...');

  return new Promise((resolve, reject) => {
    unzip(this.path, { dir: tmpdir.name }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      this.dir = tmpdir.name;
      // console.log(`Unzipped EPUB.`);
      resolve(this);
    });
  });
};

EPUB.prototype.getContentDocsPaths = function getContentDocsPaths() {
  return Promise.resolve(epubParse.getSpinePaths(this.dir, 'application/xhtml+xml'));
};

module.exports = EPUB;
