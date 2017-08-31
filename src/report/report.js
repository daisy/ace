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
const winston = require('winston');

const reportBuilder = require('./json-report-builder.js');

const report = exports;
const jsonReport = new reportBuilder.Report();

function headingsToOutline(headings) {
  const result = [];
  let level = 1;

  result.push('<ul>');
  headings.forEach((hx) => {
    if (hx.level < level) {
      result.push('</li>');
      for (let i = hx.level; i < level; i += 1) {
        result.push('</ul></li>');
      }
    } else if (hx.level > level) {
      for (let i = level + 1; i < hx.level; i += 1) {
        result.push(`<ul><li><span class="toc-missing">Missing heading h${i}</span>`);
      }
      result.push('<ul>');
    }
    result.push(`<li><span class="toc-h${hx.level}">`, hx.html, '</span>');
    level = hx.level;
  });
  for (let i = level; i > 0; i -= 1) {
    result.push('</li></ul>');
  }
  return result.join('');
}

function aggregateHTMLOutlines(outlines) {

  return `<ol><li>${outlines.join('</li><li>')}</li></ol>`;
}


report.initialize = function initialize(epub) {
    jsonReport.withTitle("ACE Report")
            .withDescription("Accessibility Checker Report" )
            .withTestSubject(epub.path, "", "", epub.metadata);

}
report.addContentDocAssertion = function addContentDocAssertion(assertion) {
    jsonReport.withAssertion(assertion);
}
report.addOutline = function addOutline(outline) {
    jsonReport.withHOutline(outline);
}
report.addHeadings = function addHeadings(headings) {
    jsonReport.withHeadingsOutline(headingsToOutline(headings));
}
report.addHTMLOutlines = function addHTMLOutlines(outlines) {
    jsonReport.withHTMLOutline(aggregateHTMLOutlines(outlines));
}
report.addEPUBNav = function addEPUBNav(navDoc) {
    jsonReport.withEPUBOutline(navDoc.tocHTML);
}
report.addImages = function addHImages(images) {
    jsonReport.withImages(images);
}
report.getJsonReport = function getJsonReport() {
    return jsonReport;
}
report.copyData = function copyData(outdir) {
    winston.info("Copying data");
    if (jsonReport.data === null) return;
    return fs.pathExists(outdir)
        .then((exists) => {
          if (!exists) fs.mkdirSync(outdir);
        })
        .then(() => {
          if (jsonReport.data.images != null) {
            jsonReport.data.images.forEach((img) => {
              const fromPath = img.filepath;
              const toPath = path.join(outdir, 'data', img.path);
              delete img.filepath;
              return fs.copy(fromPath, toPath, {
                overwrite: false,
              });
            });
          }
        });
}
report.saveJson = function saveJson(outdir) {
    winston.info("Saving JSON report");
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
  winston.info("Saving HTML report");
  // create a js file that the html report uses as its data source
  const aceReport = JSON.stringify(jsonReport, null, '  ');
  const js = "const aceReportData = " + aceReport + ";";

  // copy report.html and the contents of /js and /css to the outdir
  return fs.copy(path.join(__dirname, 'resources/report.html'), path.join(outdir, "report.html"))
    //.then(() => fs.copy(path.join(__dirname, './resources/css/'), path.join(outdir, "css/")))
    .then(() => fs.copy(path.join(__dirname, './resources/js/'), path.join(outdir, "js/")))
    .then(() => fs.writeFile(path.join(outdir, 'js/', 'aceReportData.js'), js, 'UTF-8'))
    .catch(err => winston.error(err));
}
