'use strict';

const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');

const builders = require('./report-builders.js');
const a11yMetaChecker = require("./analyze-a11y-metadata.js");


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

module.exports = class Report {
  constructor(epub) {
    this._builder = new builders.ReportBuilder()
      .withTestSubject(epub.path, '', '', epub.metadata)
      .withA11yMeta(a11yMetaChecker.analyze(epub.metadata));
  }

  get json() {
    return this._builder.build();
  }

  addAssertions(assertions) {
    this._builder.withAssertions(assertions);
    return this;
  }
  addData(data) {
    this._builder.withData(data);
  }
  addOutline(outline) {
    this._builder.withHOutline(outline);
    return this;
  }
  addHeadings(headings) {
    this._builder.withHeadingsOutline(headingsToOutline(headings));
    return this;
  }
  addHTMLOutlines(outlines) {
    this._builder.withHTMLOutline(aggregateHTMLOutlines(outlines));
    return this;
  }
  addEPUBNav(navDoc) {
    this._builder.withEPUBOutline(navDoc.tocHTML);
    return this;
  }
  addProperties(properties) {
    this._builder.withProperties(properties);
    return this;
  }
  copyData(outdir) {
    winston.info("Copying data");
    if (this.json.data === null) return;
    return fs.pathExists(outdir)
        .then((exists) => {
          if (!exists) fs.ensureDirSync(outdir);
        })
        .then(() => {
          if (this.json.data.images != null) {
            this.json.data.images.forEach((img) => {
              const fromPath = img.path;
              const toPath = path.join(outdir, 'data', img.src);
              delete img.path;
              return fs.pathExists(fromPath)
                .then((exists) => {
                  if (exists) {
                    return fs.copy(fromPath, toPath, {
                      overwrite: false,
                    });
                  } else {
                    winston.warn(`Couldn’t copy resource '${img.src}'`);
                    return Promise.resolve();
                  }
                });
            });
          }
        });
  }
  saveJson(outdir) {
    winston.info("Saving JSON report");
    return fs.pathExists(outdir)
        .then((exists) => {
          if (!exists) fs.ensureDirSync(outdir);
        })
        .then(() => {
            const aceReport = JSON.stringify(this.json, null, '  ');
            return aceReport;
        })
        .then((aceReport) => Promise.all([
          fs.writeFile(path.join(outdir, 'ace.json'), aceReport, 'UTF-8'),
        ]));
  }
  saveHtml(outdir) {
    winston.info("Saving HTML report");
    // create a js file that the html report uses as its data source
    const aceReport = JSON.stringify(this.json, null, '  ');
    const js = "const aceReportData = " + aceReport + ";";

    // copy report.html and the contents of /js and /css to the outdir
    return fs.copy(path.join(__dirname, 'resources/report.html'), path.join(outdir, "report.html"))
      //.then(() => fs.copy(path.join(__dirname, './resources/css/'), path.join(outdir, "css/")))
      .then(() => fs.copy(path.join(__dirname, './resources/js/'), path.join(outdir, "js/")))
      .then(() => fs.writeFile(path.join(outdir, 'js/', 'aceReportData.js'), js, 'UTF-8'))
      .catch(err => winston.error(err));
  }
}
