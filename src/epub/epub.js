'use strict';

const epubParse = require('./epub-parse.js');
const unzip = require('extract-zip');
const tmp = require('tmp');
const fs = require('fs-extra');
const path = require('path');

function EPUB(path) {
  this.path = path;
  this.contentDocs = [];
  this.navDoc = {};
}

EPUB.prototype.isUnpacked = function isUnpacked() {
  // assuming this fileset already passed epubcheck
  // so no need to verify its format
  return fs.statSync(this.path).isDirectory();
};

EPUB.prototype.extract = function extract() {

  // only extract if not already unpacked
  if (this.isUnpacked()) {
    this.dir = this.path;
    return new Promise((resolve, reject) => {
      resolve(this);
    });
  }

  else {
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
  }
};

EPUB.prototype.parse = function parse() {
  const epubParser = new epubParse.EpubParser();
  epubParser.parse(this.dir)
    .then(() => {
      this.contentDocs = epubParser.contentDocs;
      this.navDoc = epubParser.navDoc;
      this.metadata = epubParser.metadata
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = EPUB;
