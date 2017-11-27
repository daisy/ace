"use strict";

function AceReport(data) {
  // lists of unique values for the UI filtering
  this.ruleFilter = ["all"];
  this.impactFilter = ["all"];
  this.fileFilter = ["all"];
  // maps filepath to titles
  this.fileTitles = {};

  this.metadata = this.parseMetadata(data);
  this.a11ymetadata = data["a11y-metadata"];
  this.flatData = [];
  this.rulesetTags = ['wcag2a', 'wcag2aa', 'EPUB'];
  this.flattenData(data);
}

// returns {"filterName": [labels,... ],...}
AceReport.prototype.getFilters = function () {
  return [{ "name": "rule", "values": this.ruleFilter }, { "name": "impact", "values": this.impactFilter }, { "name": "file", "values": this.fileFilter }];
};

AceReport.prototype.getMetadata = function (filename) {
  return this.metadata;
};
AceReport.prototype.getA11yMetadata = function () {
  return this.a11ymetadata;
};
AceReport.prototype.getTitleForFile = function (filename) {
  if (this.fileTitles[filename] === "") {
    return "No title";
  }
  return this.fileTitles[filename];
};

AceReport.prototype.getAllViolations = function () {
  return this.flatData;
};

// expects:
// {"rule": "all", "impact": "serious", "file": "p1.xhtml"}
AceReport.prototype.filterViolations = function (filters) {
  var filteredList = [];
  this.flatData.forEach(function (item) {
    if ((filters["rule"] == "all" || item["rule"] === filters["rule"]) && (filters["impact"] == "all" || item["impact"] === filters["impact"]) && (filters["file"] == "all" || item["file"] === filters["file"])) {
      filteredList.push(item);
    }
  });
  return filteredList;
};

AceReport.prototype.getSummaryOfViolations = function () {
  var thiz = this;
  var summaryData = {
    'critical': { 'wcag2a': 0, 'wcag2aa': 0, 'EPUB': 0, 'other': 0 },
    'serious': { 'wcag2a': 0, 'wcag2aa': 0, 'EPUB': 0, 'other': 0 },
    'moderate': { 'wcag2a': 0, 'wcag2aa': 0, 'EPUB': 0, 'other': 0 },
    'minor': { 'wcag2a': 0, 'wcag2aa': 0, 'EPUB': 0, 'other': 0 }
  };

  this.flatData.forEach(function (item) {
    var found = false;
    item.rulesetTags.forEach(function (tag) {
      if (thiz.rulesetTags.indexOf(tag) > -1) {
        summaryData[item.impact][tag] += 1;
        found = true;
      }
    });
    if (!found) {
      summaryData[item.impact]['other'] += 1;
    }
  });

  return summaryData;
};

// make a flat list of the violations
AceReport.prototype.flattenData = function (data) {
  var thiz = this;
  data.assertions.forEach(function (assertion) {
    var filename = assertion["earl:testSubject"]["url"];
    var filetitle = assertion["earl:testSubject"]["dct:title"];
    assertion.assertions.forEach(function (item) {
      var obj = {
        "file": filename,
        "engine": item["earl:assertedBy"],
        "kburl": item["earl:test"]["help"]["url"],
        "kbtitle": item["earl:test"]["help"]["title"],
        "rule": item["earl:test"]["dct:title"],
        "desc": item["earl:result"]["dct:description"],
        "pointer": item["earl:result"]["earl:pointer"],
        "impact": item["earl:test"]["earl:impact"],
        "location": filename,
        "rulesetTags": item["earl:test"]["rulesetTags"]
      };
      if (item["earl:result"]["earl:pointer"]) {
        obj.location += "#epubcfi(" + item["earl:result"]["earl:pointer"]["cfi"] + ")";
      }
      thiz.flatData.push(obj);

      thiz.addIfUnique(obj["file"], thiz.fileFilter);
      thiz.addIfUnique(obj["rule"], thiz.ruleFilter);
      thiz.addIfUnique(obj["impact"], thiz.impactFilter);
    });
    thiz.fileTitles[filename] = filetitle;
  });
};

AceReport.prototype.parseMetadata = function (data) {
  return {
    "softwareName": data["earl:assertedBy"]["doap:name"],
    "softwareVersion": data["earl:assertedBy"]["doap:release"]["doap:revision"],
    "pubUrl": data["earl:testSubject"]["url"],
    "reportDate": data["dct:date"]
  };
};
AceReport.prototype.addIfUnique = function (value, list) {
  if (list.indexOf(value) == -1) {
    list.push(value);
  }
};