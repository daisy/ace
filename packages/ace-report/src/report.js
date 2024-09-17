'use strict';

const fs = require('fs-extra');
const fsNode = require('fs');
const path = require('path');
const winston = require('winston');

const builders = require('./report-builders.js');
const a11yMetaChecker = require("./analyze-a11y-metadata.js");
const generateHtmlReport = require("./generate-html-report.js");

const { localize, setCurrentLanguage } = require('./l10n/localize').localizer;

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
        result.push(`<ul><li><span class="toc-missing">${localize("missingheading", { i, interpolation: { escapeValue: false } })}</span>`);
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

  constructor(epub, outdir, lang) {
    this.epub = epub;
    this.outdir = outdir;
    this.lang = lang;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const l10nDoneCallback = () => {
        this._builder = new builders.ReportBuilder()
        .setOutdir(this.outdir)
        .withTestSubject(this.epub.path, '', this.epub.version, '', this.epub.metadata, this.epub.links)
        .withA11yMeta(a11yMetaChecker.analyze(this.epub.metadata, this.epub.links));

        resolve(this); // Report instance
      }
      if (this.lang) {
        setCurrentLanguage(this.lang, l10nDoneCallback);
      } else {
        l10nDoneCallback();
      }
    });
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
  // remove the path properties as they aren't needed
  // this has to happen after data is copied, if we're copying it
  cleanData() {
    winston.debug("Cleaning data");
    var removePath = function(items) {
      return items.map((item) => {
        delete item.path;
        return item;
      });
    };
    this._builder.cleanData('images', removePath);
    this._builder.cleanData('iframes', removePath);

    return Promise.resolve();
  }
  copyData(outdir) {
    winston.info("Copying data");
    if (this.json.data === null) return Promise.resolve();
    return fs.pathExists(outdir)
        .then((exists) => {
          if (!exists) return fs.ensureDirSync(outdir);
          return Promise.resolve();
        })
        .then(() => {
          if (this.json.data.images != null) {
            return Promise.all(this.json.data.images.map((img) => {
              const fromPath = img.path;
              const toPath = path.join(outdir, 'data', img.src);
              return fs.pathExists(fromPath)
                .then((exists) => {
                  if (exists) {
                    return fs.copy(fromPath, toPath, { overwrite: false })
                    .catch(err => {
                      winston.warn(`Couldn't copy resource '${img.src}'. Error: ${err}`);
                    });
                  }
                  winston.warn(`Couldn’t copy resource '${img.src}'. File does not exist.`);
                  return Promise.resolve();
                });
            }));
          }
          return Promise.resolve();
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
          fs.writeFileSync(path.join(outdir, 'report.json'), aceReport, 'UTF-8'),
        ]));
  }
  saveHtml(outdir) {
    winston.info("Saving HTML report");

    generateHtmlReport(this.json)
    .then((result) => {
      fs.writeFileSync(path.join(outdir, 'report.html'), result, 'UTF-8');
      const assetDirIn = path.join(__dirname, 'report-template-assets');
      const assetDirOut = path.join(outdir, 'report-html-files');
      if (!fsNode.existsSync(assetDirOut)) {
        fs.ensureDirSync(assetDirOut);
      }
      fsNode.readdirSync(assetDirIn).map(file => path.resolve(assetDirIn, file)).filter(file => fsNode.lstatSync(file).isFile()).forEach(f => {
        const dest = path.join(assetDirOut, path.basename(f));
        fs.writeFileSync(dest, fsNode.readFileSync(f, { encoding: "utf8" }), { encoding: "utf8" });
        // fsNode.createReadStream(f).pipe(
        //   fsNode.createWriteStream(dest)
        // );
      });
    })
    .catch(err => winston.error(err));
  }
}
