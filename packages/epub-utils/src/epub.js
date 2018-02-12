'use strict';

const epubParse = require('./epub-parse.js');
const extractZip = require('extract-zip');
const tmp = require('tmp');
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');

tmp.setGracefulCleanup();

async function unzip(path) {
  const tmpdir = tmp.dirSync({ unsafeCleanup: true }).name;
  return new Promise((resolve, reject) => {
    extractZip(path, { dir: tmpdir }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(tmpdir);
      }
    });
  }) 
}

async function retryUnzip(epub, error) {
  if (error.message === undefined) throw error;
  winston.info('Trying to repair the archive and unzip again...');
  try {
    // Detect 'invalid comment length' errors
    const invalidCommentLengthMatch =  error.message.match(/invalid comment length\. expected: (\d+)\. found: (\d)/);
    if (invalidCommentLengthMatch) {
      const tmpEPUB = tmp.fileSync({ unsafeCleanup: true }).name;
      const size  = fs.statSync(epub.path).size;
      const truncatedSize = size - invalidCommentLengthMatch[1];
      fs.copySync(epub.path, tmpEPUB);
      fs.truncateSync(tmpEPUB, truncatedSize);
      return await unzip(tmpEPUB);
    } else {
      winston.error('The ZIP archive couldn’t be repaired.');
    }
  } catch (error) {
    winston.error('Unzipping failed again');
    winston.debug(error);
  }
  throw error;
}

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

  async extract() {
    if (this.basedir !== undefined) {
      return this;
    } else if (this.expanded) {
      winston.verbose('EPUB is already unpacked');
      this.basedir = this.path;
      return this;
    } else {
      winston.verbose('Extracting EPUB');
      let unzippedDir;
      try {
        unzippedDir = await unzip(this.path);
      } catch (error) {
        winston.error('Failed to unzip EPUB (the ZIP archive may be corrupt).');
        winston.debug(error);
        try {
          unzippedDir = await retryUnzip(this, error);
        } catch (error) {
          throw error;
        }
      }
      this.basedir = unzippedDir;
      return this;
    }
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
