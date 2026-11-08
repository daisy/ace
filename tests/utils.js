'use strict';

function findAssertionsForDoc(report, path) {
  let matches;
  for (const assertion of report.assertions) {
    if (assertion['earl:testSubject'].url && assertion['earl:testSubject'].url.replace(/\\/g, "/") === path.replace(/\\/g, "/")) {
      // A document can have both EPUB and aXe assertion groups at the same URL.
      if (!matches) matches = [];
      matches = matches.concat(assertion.assertions);
    }
  }
  return matches;
}

module.exports = {
  findAssertionsForDoc
};
