const express = require('express');
const uuidv4 = require('uuid/v4');
const multer = require('multer');
const fs = require('fs');
const zip = require('express-easy-zip');
const path = require('path');
const tmp = require('tmp');
const winston = require('winston');
const ace = require('../core/ace.js');

const UPLOADS = tmp.dirSync({ unsafeCleanup: true }).name;
const DEFAULTPORT = 8000;
const DEFAULTHOST = "localhost";
const JOBSTATUS = {"done": 0, "processing": 1, "error": -1}
var server = express();
var upload = multer({dest: UPLOADS});
var joblist = [];

server = express();
server.use(zip());
initRoutes();
// todo customize port and hostname
server.listen(DEFAULTPORT, DEFAULTHOST, function() {
  winston.info("Ace server listening on " + DEFAULTHOST + ":" + DEFAULTPORT);
});

function initRoutes() {
  server.get('/jobs/:jobid', getJob);
  server.post('/jobs/', upload.single('epub'), postJob);
  server.use('/jobs/:jobid/report/', getReport);
  server.get('/jobs/', getJobs);
}

// return a jobinfo object
function getJob(req, res, next) {
  if(!("jobid" in req.params)) {
    res.sendStatus(400); // bad request
  }
  else {
    var jobdata = joblist.find(jobdata => jobdata.jobinfo.id === req.params.jobid);
    if (jobdata == undefined || jobdata == null) {
      res.sendStatus(404); // not found
    }
    else {
      res.json(jobdata.jobinfo);
    }
  }
  next();
}

// return a list of jobinfo objects
function getJobs(req, res, next) {
  let jobsinfo = joblist.map((jobdata, index, joblist) => {
    return jobdata.jobinfo;
  });
  res.json(jobsinfo);
  next();
}

// return a jobinfo object
function postJob(req, res, next) {
  if (req.file == undefined) {
    res.sendStatus(400); // bad request
  }
  else {
    var jobdata = newJob(req.file.path);
    res.status(201); // created
    res.json(jobdata.jobinfo);
  }
  next();
}

// return a zipfile of the report directory
function getReport(req, res) {
  if(!("jobid" in req.params)) {
    res.sendStatus(400); // bad request
  }
  else {
    var jobdata = joblist.find(jobdata => jobdata.jobinfo.id === req.params.jobid);
    if (jobdata == undefined || jobdata == null) {
      res.sendStatus(404); // not found
    }
    else {
      res.zip({
        files: [
            { path: jobdata.internal.outputDir, name: 'aceOutput' + jobdata.jobinfo.id }
        ],
        filename: 'ace-report-' + req.params.jobid + '.zip'
      });
    }
  }
}

// start a new job
function newJob(epubPath) {

  winston.info("Submitting job");
  var jobdata = {
    jobinfo: {"id": uuidv4(), "status": JOBSTATUS.processing, "reportUrl": undefined},
    internal: {"outputDir": tmp.dirSync({ unsafeCleanup: true }).name, "epubPath": epubPath}
  };

  joblist.push(jobdata);

  // execute the job with Ace
  ace(epubPath, {jobid: jobdata.jobinfo.id, outdir: jobdata.internal.outputDir})
  .then((jobid) => {
    var idx = joblist.findIndex(job => job.jobinfo.id === jobid);
    winston.info("Job finished " + joblist[idx].jobinfo.id);
    joblist[idx].jobinfo.status = JOBSTATUS.done;
    joblist[idx].jobinfo.reportUrl = "http://" + DEFAULTHOST + ":" + DEFAULTPORT + "/jobs/" + joblist[idx].jobinfo.id + "/report/";
  })
  .catch((jobid) => {
    var idx = joblist.findIndex(job => job.jobinfo.id === jobid);
    winston.info("Job error " + joblist[idx].jobinfo.id);
    joblist[idx].jobinfo.status = JOBSTATUS.error;
  });

  // return the jobinfo
  return jobdata.jobinfo;
}
