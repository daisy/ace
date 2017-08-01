'use strict';

/*
basic usage:

initialize report:
startReport(epubUrl);

as each result comes in:
addContentDocAssertion(axe2ace(axeResults));

add additional info:
addMetadata(..)
addOutline(..)
TBD

*/

const fs = require('fs-extra');
const path = require('path');
const reportBuilder = require('./json-report-builder.js');

const report = exports;
const jsonReport = new reportBuilder.Report();


report.initialize = function initialize(epub) {
    jsonReport.withTitle("ACE Report")
            .withDescription("Accessibility Checker Report" )
            .withTestSubject(epub.path, epub.title, epub.identifier);

}
report.addContentDocAssertion = function addContentDocAssertion(assertion) {
    //console.log(assertion);
    jsonReport.withAssertion(assertion);
}
report.addMetadata = function addMetadata(metadata) {
    jsonReport.withMetadata(metadata);
}
report.addOutline = function addOutline(outline) {
    jsonReport.withOutline(outline);
}
report.getJsonReport = function getJsonReport() {
    return jsonReport;
}
report.saveJson = function saveJson(outdir) {
    console.log("saving json");
    //console.log(jsonReport);
    return fs.pathExists(outdir)
        .then((exists) => {
          if (!exists) fs.mkdirSync(outdir);
        })
        .then(() => {
            const aceReport = JSON.stringify(jsonReport, null, '  ');
            return aceReport;
        })
        .then((aceReport) => Promise.all([
          fs.writeFile(path.join(outdir, 'ace.json'), aceReport, 'UTF-8'),
        ]));
}
report.saveHtml = function saveHtml(outdir) {
  console.log("saving html");
  // create a js file that the html report uses as its data source
  const aceReport = JSON.stringify(jsonReport, null, '  ');
  const js = "const aceReportData = " + aceReport + ";";

  // copy report.html and the contents of /js and /css to the outdir
  return fs.copy(path.join(__dirname, 'resources/report.html'), path.join(outdir, "report.html"))
    //.then(() => fs.copy(path.join(__dirname, './resources/css/'), path.join(outdir, "css/")))
    .then(() => fs.copy(path.join(__dirname, './resources/js/'), path.join(outdir, "js/")))
    .then(() => fs.writeFile(path.join(outdir, 'js/', 'aceReportData.js'), js, 'UTF-8'))
    .catch(err => console.error(err));
}
