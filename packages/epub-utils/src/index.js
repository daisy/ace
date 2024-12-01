'use strict';

const EPUB = require('./epub.js');
const epubParse = require('./epub-parse.js');

module.exports = {
  EPUB,
  encodeURIComponent_RFC3986: epubParse.encodeURIComponent_RFC3986,
};
