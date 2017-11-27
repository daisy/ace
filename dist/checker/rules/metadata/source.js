'use strict';

// check

module.exports = epub => epub.navDoc.hasPageList && (epub.metadata['dc:source'] === undefined || epub.metadata['dc:source'].toString() === '');