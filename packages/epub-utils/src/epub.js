'use strict';

const epubParse = require('./epub-parse.js');
const unzip = require('extract-zip');
const tmp = require('tmp');
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');

tmp.setGracefulCleanup();

class EPUB {
  constructor(epub, cwd = process.cwd()) {
    this.path = path.resolve(cwd, epub);
    this.basedir = undefined;
    this.parsed = false;
    this.navDoc = {};
    this.contentDocs = [];
  }

  get expanded() {
    return fs.statSync(this.path).isDirectory();
  }

  extract() {
    return new Promise((resolve, reject) => {
      if (this.basedir !== undefined) {
        resolve(this);
      } else if (this.expanded) {
        winston.verbose('EPUB is already unpacked');
        this.basedir = this.path;
        resolve(this);
      } else {
        winston.verbose('Extracting EPUB');
        const tmpdir = tmp.dirSync({ unsafeCleanup: true }); // remove even when not empty
        unzip(this.path, { dir: tmpdir.name }, (err) => {
          if (err) {
            winston.error('Failed to unzip EPUB (the ZIP archive may be corrupt).');
            reject(err);
          } else {
            this.basedir = tmpdir.name;
            resolve(this);
          }
        });
      }
    });
  }

  parse() {
    return new Promise((resolve, reject) => {
      if (this.parsed) return resolve(this);
      return new epubParse.EpubParser().parse(this.basedir)
        .then((parsed) => {
          Object.assign(this, parsed);
          this.parsed = true;
          return resolve(this);
        })
        .catch((err) => {
          winston.error('Failed to parse EPUB');
          return reject(err);
        });
    });
  }

}

module.exports = EPUB;
