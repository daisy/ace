'use strict';

export function findAssertionsForDoc(report, path) {
  for (const assertion of report.assertions) {
    if (assertion['earl:testSubject'].url && assertion['earl:testSubject'].url.replace(/\\/g, "/") === path.replace(/\\/g, "/")) {
      return assertion.assertions;
    }
  }
}
