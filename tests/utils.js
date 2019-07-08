'use strict';

export function findAssertionsForDoc(report, path) {
  for (const assertion of report.assertions) {
    if (assertion['earl:testSubject'].url === path) {
      return assertion.assertions;
    }
  }
}
