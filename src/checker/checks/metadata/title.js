'use strict';

// TODO: ?
function asString(arrayOrString) {
  if (Array.isArray(arrayOrString) && arrayOrString.length > 0) {
    return asString(arrayOrString[0]);
  } else if (arrayOrString !== undefined) {
    return arrayOrString.toString().trim();
  }
  return '';
}
// check
module.exports = epub => asString(epub.metadata['dc:title']) === '';

