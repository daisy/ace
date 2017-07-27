'use strict';

const epubParse = require('./epub-parse.js');
const unzip = require('extract-zip');
const tmp = require('tmp');

function EPUB(path) {
  this.path = path;
  this.contentDocs = [];
  this.title = "";
  this.identifier = "";
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

EPUB.prototype.parse = function() {
  const epubParser = new epubParse.EpubParser();
  epubParser.parse(this.dir)
    .then(epubParser => {
      this.contentDocs = epubParser.contentDocs;
      this.title = epubParser.docTitle;
      this.identifier = epubParser.identifier;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = EPUB;
