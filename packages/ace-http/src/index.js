'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');
const zip = require('express-easy-zip');
const path = require('path');
const tmp = require('tmp');
const winston = require('winston');
const meow = require('meow');
const ace = require('@daisy/ace-core');
const logger = require('@daisy/ace-logger');

const axeRunner = require('@daisy/ace-axe-runner-puppeteer');

const pkg = require('@daisy/ace-meta/package');

// tmp.setGracefulCleanup();

const UPLOADS = tmp.dirSync({ unsafeCleanup: true }).name;
const DEFAULTPORT = 8000;
const DEFAULTHOST = "localhost";
const JOBSTATUS = {"done": 0, "processing": 1, "error": -1}
var server = express();
var upload = multer({dest: UPLOADS});
var joblist = [];
var baseurl = "";

const meowHelpMessage = `
  Usage: ace-http [options]

  Options:

    -h, --help             output usage information
    -v, --version          output the version number

    -H, --host             set the server's hostname (default: ${DEFAULTHOST})
    -p, --port             set the server's port (default: ${DEFAULTPORT})

    -V, --verbose          display verbose output
    -s, --silent           do not display any output

    -l, --lang  <language> language code for localized messages (e.g. "fr"), default is "en"

    -T, --timeout <milliseconds> (default is 240000 per document)
  Examples
    $ ace-http -p 3000`;
const meowOptions = {
  autoHelp: false,
  autoVersion: false,
  version: pkg.version,
  flags: {
    help: {
      alias: 'h'
    },
    silent: {
      alias: 's',
      type: 'boolean'
    },
    version: {
      alias: 'v'
    },
    verbose: {
      alias: 'V',
      type: 'boolean'
    },
    host: {
      alias: 'H',
      type: 'string'
    },
    port: {
      alias: 'p',
      type: 'string'
    },
    lang: {
      alias: 'l',
      type: 'string'
    }
  }
};
const cli = meow(meowHelpMessage, meowOptions);

function run() {
  if (cli.flags.help) {
    cli.showHelp(0);
    return;
  }

  if (cli.flags.version) {
    cli.showVersion(2);
    return;
  }

  logger.initLogger({verbose: cli.flags.verbose, silent: cli.flags.silent, fileName: "ace-http.log"});
  server = express();
  server.use(zip());
  initRoutes();

  var host = cli.flags.host ? cli.flags.host : DEFAULTHOST;
  var port = cli.flags.port ? cli.flags.port : DEFAULTPORT;
  baseurl = "http://" + host + ":" + port; // just for convenience

  // todo customize port and hostname
  server.listen(port, host, function() {
    winston.info("[ace-http] server listening on " + baseurl);
  });
}

function initRoutes() {
  server.get('/jobs/:jobid', getJob);
  server.post('/jobs/', upload.single('epub'), postJob);
  server.use('/jobs/:jobid/report/', getReport);
  server.get('/jobs/', getJobs);
}

// return the job information
function getJob(req, res, next) {
  var jobdata = joblist.find(jobdata => jobdata.internal.id === req.params.jobid);
  if (!jobdata) {
    res.sendStatus(404); // not found
  }
  else {
    res.json(jobdata.public);
  }
  next();
}

// return a list of job objects
function getJobs(req, res, next) {
  let jobsinfo = joblist.map((jobdata, index, joblist) => {
    return jobdata.public;
  });
  res.json(jobsinfo);
  next();
}

// return the job information
function postJob(req, res, next) {
  if (!req.file) {
    res.sendStatus(400); // bad request
  }
  else {
    var jobid = uuidv4();
    var jobdata = {
      public: {
        "job": baseurl + "/jobs/" + jobid,
        "status": JOBSTATUS.processing,
        "report": {"zip": undefined, "json": undefined}
      },
      internal: {
        "id": jobid,
        "outputDir": tmp.dirSync({ unsafeCleanup: true }).name,
        "epubPath": req.file.path,
        "lang": cli.flags.lang,
        "timeout": cli.flags.timeout || undefined,
      }
    };
    newJob(jobdata);

    res.status(201); // created
    res.json(jobdata.public);
  }
  next();
}

// return the report as either a zipfile or a json object, depending on what was specifically requested
function getReport(req, res) {
  var jobdata = joblist.find(jobdata => jobdata.internal.id === req.params.jobid);
  if (!jobdata) {
    res.sendStatus(404); // not found
  }
  else {
    if ("type" in req.query && req.query.type === "json") {
      var jsonReport = require(path.join(jobdata.internal.outputDir, "report.json"));
      res.json(jsonReport);
    }
    else {
      res.zip({
        files: [
            { path: jobdata.internal.outputDir, name: 'ace-report-' + jobdata.internal.id }
        ],
        filename: 'ace-report-' + jobdata.internal.id + '.zip'
      });
    }
  }
}

// start a new job
function newJob(jobdata) {
  winston.info("[ace-http] Job started");
  joblist.push(jobdata);

  // execute the job with Ace
  ace(jobdata.internal.epubPath, {'jobid': jobdata.internal.id, 'outdir': jobdata.internal.outputDir, 'lang': jobdata.internal.lang, 'timeout': jobdata.internal.timeout}, axeRunner)
  .then((jobData) => {
    var jobId = jobData[0];
    var idx = joblist.findIndex(job => job.internal.id === jobId);
    winston.info("[ace-http] Job finished " + joblist[idx].internal.id);
    joblist[idx].public.status = JOBSTATUS.done;
    joblist[idx].public.report.zip = joblist[idx].public.job + "/report/?type=zip";
    joblist[idx].public.report.json = joblist[idx].public.job + "/report/?type=json";
  })
  .catch((jobid) => {
    var idx = joblist.findIndex(job => job.internal.id === jobid);
    winston.info("[ace-http] Job error " + joblist[idx].internal.id);
    joblist[idx].public.status = JOBSTATUS.error;
  });
}

module.exports = { run };
