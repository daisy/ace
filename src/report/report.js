'use strict';

const filenamify = require('filenamify-url');
const filehound = require('filehound');
const fs = require('fs-extra');
const path = require('path');

require('marko/node-require');
const template = require('./report-template'); // eslint-disable-line import/no-unresolved


const report = exports;

report.processResult = function processResult(result) {
  const fullReport = result;
  const url = result.axe.url;
  const basedir = this.tmpdir;
  const outdir = path.join(basedir, filenamify(url));
  // console.log('reporting '+url+' to '+outdir);
  return fs.pathExists(outdir)
    .then((exists) => {
      if (!exists) fs.mkdirSync(outdir);
    })
    .then(() => {
      const axeReport = JSON.stringify(fullReport.axe, null, '  ');
      fullReport.axe = null;
      delete fullReport.axe;
      const aceReport = JSON.stringify(fullReport, null, '  ');
      return [axeReport, aceReport];
    })
    .then(([axeReport, aceReport]) => Promise.all([
      fs.writeFile(path.join(outdir, 'axe.json'), axeReport, 'UTF-8'),
      fs.writeFile(path.join(outdir, 'ace.json'), aceReport, 'UTF-8'),
    ]));
};

report.createSummary = (inputFilename, tmpDir, outDir) => {
  console.log('Creating report...');

  /*
  report JSON format expected by template

  {
  "timestamp": "2/2/2 22:22",
  "filepath": "/path/to/file.epub",
  "files":
  [
    {
      "filename": "abcdefg.xhtml",
      "axe": {
        violations: [],
        passes: []
      },
      "ace": {
      }
    },
    ...
  ]
}
  */

  return filehound.create().paths(tmpDir).directory().find()
  .then(subdirs => Promise.all(
    subdirs.map((subdir) => {
      // ideally the filename would be in the report json
      // for now, we'll just unmangle it
      const idx = subdir.lastIndexOf('!') + 1;
      const filename = subdir.slice(idx).replace('_xhtml', '.xhtml');
      // read json reports
      return Promise.all([
        fs.readFile(path.join(subdir, 'axe.json'))
        .then(jsonStr => JSON.parse(jsonStr)),
        fs.readFile(path.join(subdir, 'ace.json'))
        .then(jsonStr => JSON.parse(jsonStr)),
      ])
      .then(([axeReport, aceReport]) => (
        {
          filename,
          axe: axeReport,
          ace: aceReport,
        }
      ));
    })))
  .then(filesData => ({
    timestamp: new Date().toLocaleString(),
    filepath: inputFilename,
    files: filesData,
  }))
  .then((reportJson) => {
    const reportStr = JSON.stringify(reportJson, null, ' ');
    if (outDir) {
      return Promise.all([
        // Produce the JSON report
        fs.writeFile(path.join(outDir, 'report.json'), reportStr, 'UTF-8')
          .then(console.log(`Wrote ${outDir}/report.json`)),
        // Produce the HTML report
        Promise.resolve()
          .then(() => {
            const out = fs.createWriteStream(path.join(outDir, 'report.html'), { encoding: 'utf8' });
            template.render(reportJson, out);
          })
          .then(() => console.log(`Wrote ${outDir}/report.html`)),
      ]);
    }
    return console.log(reportStr);
  });
};
