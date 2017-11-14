'use strict';

// check
module.exports = epub => (epub.metadata['dc:title'] || '').toString().trim() === '';

