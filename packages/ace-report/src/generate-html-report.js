'use strict';

const escape = require('escape-html');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const { localize, getCurrentLanguage } = require('./l10n/localize').localizer;

const LOG_DEBUG_URLS = process.env.LOG_DEBUG_URLS === "1";

// generate the html report and return it as a string
module.exports = function generateHtmlReport(reportData) {

  return new Promise((resolve, reject) => {
    var flatListOfViolations = createFlatListOfViolations(reportData.assertions);
    var violationStats = collectViolationStats(flatListOfViolations);
    var violationFilters = createViolationFilters(flatListOfViolations);
    var rulesetTagLabels = {
      'wcag2a': 'WCAG 2.0 A',
      'wcag2aa': 'WCAG 2.0 AA',
      'wcag2aaa': 'WCAG 2.0 AAA',
      'wcag21a': 'WCAG 2.1 A',
      'wcag21aa': 'WCAG 2.1 AA',
      'wcag21aaa': 'WCAG 2.1 AAA',
      'wcag22a': 'WCAG 2.2 A',
      'wcag22aa': 'WCAG 2.2 AA',
      'wcag22aaa': 'WCAG 2.2 AAA',
      'EPUB': 'EPUB',
      'best-practice': localize("bestpractice"),
      'other': localize("other")
    };

    // return 5 data cells for each ruleset: critical, serious, moderate, minor, total
    // a ruleset can be "wcag2a", "wcag2aa", "wcag2aaa", "wcag21a", "wcag21aa", "wcag21aaa", "wcag22a", "wcag22aa", "wcag22aaa", "EPUB", "other", or "total" (all rulesets)
    // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
    handlebars.registerHelper('violationStats', function(rule, options) {
      var str = "<td>" + violationStats[rule]['critical'] + "</td>"
                + "<td>" + violationStats[rule]['serious'] + "</td>"
                + "<td>" + violationStats[rule]['moderate'] + "</td>"
                + "<td>" + violationStats[rule]['minor'] + "</td>"
                + "<td>" + violationStats[rule]['total'] + "</td>"
      return new handlebars.SafeString(str);
    });

    // return a list of <option> elements containing the possible filters for given rule
    handlebars.registerHelper('violationFilter', function(rule, options) {
      var filterOptions = "";
      violationFilters[rule].forEach(function(value) {
        // winston.info("######## " + value);
        const valueDisplay = rule == "file" ? value : localize(value, {ignoreMissingKey: true}); // only handles "serious", "moderate", etc. so can be missingKey, such as "EPUB/package.opf", "color-contrast", "metadata-schema-accessibilitysummary" etc. (in which case => fallback to key string)
        // use nicer labels for ruleset options
        if (rule == "ruleset") {
          filterOptions += "<option value='" + value + "'>" + rulesetTagLabels[value] + "</option>";
        }
        else {
          filterOptions += "<option value='" + value + "'>" +
          (rule == "file" ? escape(valueDisplay) : valueDisplay)
          + "</option>";
        }
      });
      return new handlebars.SafeString(filterOptions);
    });

    // return a stringified json object representing a flat list of violations
    handlebars.registerHelper('violationsJson', function(options) {
      return new handlebars.SafeString(unescape(JSON.stringify(flatListOfViolations)) + ";")
    });

    handlebars.registerHelper('violationRows', function(options) {
      var htmlStr = '';
      flatListOfViolations.forEach(function(violation) {
        const valueDisplay = localize(violation['impact'], {ignoreMissingKey: false});
        htmlStr += `<tr>
        <td><span class='${violation['impact']}'>${valueDisplay}</span></td>
        <td><span class='ruleset'>${rulesetTagLabels[violation['applicableRulesetTag']]}</span></td>
        <td>${violation['rule']}<br/><br/><span class='engine'>${violation['engine']}</span></td>
        <td><em>\"${violation['fileTitle']}\"</em><br/><br/><code class='location'>${escape(violation['location'])}</code>`;

        if (violation.html) {
          htmlStr +=`<br/><br/><div class='snippet'>${localize("snippet")}<code>${violation.html.trim()}</code></div>`;
        }

        htmlStr += "</td>";


        var desc = violation["desc"];

        var detailsArr = desc.split("\n");
        var listStr = '';
        detailsArr.forEach(function(item) {
          if (item != "") {
            listStr += `<li>${unescape(item)}</li>`;
          }
        });

        htmlStr += `<td class='details'>
        <ul>${listStr}</ul>
        <p><a href='${violation['kburl']}' target='_blank'>${localize("learnmoreabout") + " " + violation['kbtitle']}</a></p>
        </td>`;

        htmlStr += "</tr>";
      });
      return new handlebars.SafeString(htmlStr);
    });

    handlebars.registerHelper('formatMetadataValue', function(options) {
      var vals = this;
      if (!Array.isArray(vals)) {
        vals = [vals];
      }
      const valsHTML = vals.reduce((pv, cv, i, arr) => {
        const suffix = i < (arr.length - 1) ? " | " : "";
        cv = cv.trim();
        if (/^http[s]?:\/\//.test(cv)) {
          return pv + `<a href="${cv}" target="_blank">${cv}</a>${suffix}`;
        }
        return pv + `${cv}${suffix}`;
      }
      , "");

      return new handlebars.SafeString(valsHTML);
    });
    handlebars.registerHelper('insertConformsToRow', function(options) {
      if (reportData['earl:testSubject'].hasOwnProperty('links') &&
          reportData['earl:testSubject']['links'].hasOwnProperty('dcterms:conformsTo')) {
        var vals = reportData['earl:testSubject']['links']['dcterms:conformsTo'];
        if (!Array.isArray(vals)) {
          vals = [vals];
        }
        const valsHTML = vals.reduce((pv, cv, i, arr) =>
          (pv + `<a href="${cv}" target="_blank">${cv}</a>${i < (arr.length - 1) ? " | " : ""}`)
        , "");
        return new handlebars.SafeString(`<tr><td>dcterms:conformsTo</td><td>${valsHTML}</td></tr>`);
      }
      else {
        return new handlebars.SafeString('');
      }
    });
    handlebars.registerHelper('insertCertifierReportRow', function(options) {
      if (reportData['earl:testSubject'].hasOwnProperty('links') &&
          reportData['earl:testSubject']['links'].hasOwnProperty('a11y:certifierReport')) {
        var vals = reportData['earl:testSubject']['links']['a11y:certifierReport'];
        if (!Array.isArray(vals)) {
          vals = [vals];
        }
        const valsHTML = vals.reduce((pv, cv, i, arr) =>
        (pv + `<a href="${cv}" target="_blank">${cv}</a>${i < (arr.length - 1) ? " | " : ""}`)
        , "");
        return new handlebars.SafeString(`<tr><td>a11y:certifierReport</td><td>${valsHTML}</td></tr>`);
      }
      else {
        return new handlebars.SafeString('');
      }
    });
    handlebars.registerHelper('insertCertifierCredentialRow', function(options) {
      if (reportData['earl:testSubject'].hasOwnProperty('links') &&
          reportData['earl:testSubject']['links'].hasOwnProperty('a11y:certifierCredential')) {
        var vals = reportData['earl:testSubject']['links']['a11y:certifierCredential'];
        if (!Array.isArray(vals)) {
          vals = [vals];
        }
        const valsHTML = vals.reduce((pv, cv, i, arr) =>
        (pv + `<a href="${cv}" target="_blank">${cv}</a>${i < (arr.length - 1) ? " | " : ""}`)
        , "");
        return new handlebars.SafeString(`<tr><td>a11y:certifierCredential</td><td>${valsHTML}</td></tr>`);
      }
      else {
        return new handlebars.SafeString('');
      }
    });

    handlebars.registerHelper('generatedBy', function(options) {
       
      return new handlebars.SafeString(localize("generatedby", {
        v1: (reportData['earl:assertedBy']) ? reportData['earl:assertedBy']['doap:name'] : "doap:name?",
        v2: (reportData['earl:assertedBy'] && reportData['earl:assertedBy']['doap:release']) ? reportData['earl:assertedBy']['doap:release']['doap:revision'] : "doap:release/revision?",
        v3: reportData['dct:date'],
        v4: (reportData['earl:assertedBy'] && reportData['earl:assertedBy']['doap:shortdesc']) ? " [" + reportData['earl:assertedBy']['doap:shortdesc'] + "] " : "",
        interpolation: { escapeValue: false }}));

      // if (reportData['earl:assertedBy'].hasOwnProperty('doap:name') &&
      //     reportData['earl:assertedBy'].hasOwnProperty('doap:release') &&
      //     reportData['earl:assertedBy']['doap:release'].hasOwnProperty('doap:revision')) {
      // }
      // else {
      //   return new handlebars.SafeString('');
      // }
    });
    handlebars.registerHelper('localize', function(key, options) {
      if (key === "__language__") {
        return getCurrentLanguage();
      }
      const valueDisplay = localize(key, {ignoreMissingKey: false});
      return new handlebars.SafeString(valueDisplay);
    });

    handlebars.registerHelper('encodeURI', function(src, options) {
      // console.log(JSON.stringify(options));

      if (LOG_DEBUG_URLS) {
        console.log("///// Mustache encodeURI 1");
        console.log(src);
      }
      const url = escape(encodeURI(src));
      if (LOG_DEBUG_URLS) {
        console.log("///// Mustache encodeURI 2");
        console.log(url);
      }
      return new handlebars.SafeString(url);
    });

    handlebars.registerHelper('decodeURI', function(url, options) {
      // console.log(JSON.stringify(options));

      if (LOG_DEBUG_URLS) {
        console.log("///// Mustache decodeURI 1");
        console.log(url);
      }
      const src = escape(decodeURI(url));
      if (LOG_DEBUG_URLS) {
        console.log("///// Mustache decodeURI 2");
        console.log(src);
      }
      return new handlebars.SafeString(src);
    });
    
    const content = fs.readFileSync(path.join(__dirname, "./report-template.handlebars")).toString();
    var template = handlebars.compile(content);
    var result = template(reportData);
    resolve(result);
  });

};

// summarize the violation ruleset and impact data
function collectViolationStats(flatListOfViolations) {
  var rulesetTags = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag21aaa', 'wcag22a', 'wcag22aa', 'wcag22aaa', 'EPUB', 'best-practice'];

  var summaryData = {
    'wcag2a': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag2aa': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag2aaa': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag21a': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag21aa': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag21aaa': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag22a': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag22aa': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag22aaa': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'EPUB': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'best-practice': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'other': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'total': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0}
  };

  flatListOfViolations.forEach(function(item) {
    var found = false;
    item.rulesetTags.forEach(function(tag) {
      if (rulesetTags.indexOf(tag) > -1) {
        summaryData[tag][item.impact] += 1;
        summaryData[tag]['total'] += 1;
        found = true;
      }
    });
    if (!found) {
      summaryData['other'][item.impact] += 1;
      summaryData['other']['total'] += 1;
    }
  });

  Object.keys(summaryData['total']).forEach(function(key) {
    summaryData['total'][key] +=
        summaryData['wcag2a'][key]
      + summaryData['wcag2aa'][key]
      + summaryData['wcag2aaa'][key]
      + summaryData['wcag21a'][key]
      + summaryData['wcag21aa'][key]
      + summaryData['wcag21aaa'][key]
      + summaryData['wcag22a'][key]
      + summaryData['wcag22aa'][key]
      + summaryData['wcag22aaa'][key]
      + summaryData['EPUB'][key]
      + summaryData['best-practice'][key]
      + summaryData['other'][key];
  });

  return summaryData;
}

// collect the valid values for each filter type
function createViolationFilters(violations) {
  var filters = {
      "rule": [],
      "ruleset": [],
      "impact": [],
      "file": []
  };

  violations.forEach(function(violation) {
    addIfUnique(violation["rule"], filters["rule"]);
    addIfUnique(violation["applicableRulesetTag"], filters["ruleset"]);
    addIfUnique(violation["impact"], filters["impact"]);
    addIfUnique(violation["file"], filters["file"]);
  });

  return filters;
}

// turn the nested assertions into a flat list of violations
// we're using 'assertion' and 'violation' somewhat interchangeably
function createFlatListOfViolations(violations) {
  var flatData = [];
  var rulesetTags = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag21aaa', 'wcag22a', 'wcag22aa', 'wcag22aaa', 'EPUB', 'best-practice']; // applicable ruleset tags

  violations.forEach(function(assertion) {
    var filename = assertion["earl:testSubject"]["url"];
    var filetitle = assertion["earl:testSubject"]["dct:title"];
    assertion.assertions.forEach(function(item) {

      // each item may have multiple ruleset tags from the underlying html checker
      // narrow it down to one, from our list above, or label as 'other'
      var applicableRulesetTag = "other";
      item["earl:test"]["rulesetTags"].forEach(function(tag) {
        if (rulesetTags.indexOf(tag) != -1) {
          applicableRulesetTag = tag;
        }
      });

      let desc = item["earl:result"]["dct:description"];
      if (item["earl:test"] && item["earl:test"]["dct:description"]) {
        desc = `${desc} \n ${item["earl:test"]["dct:description"]}`;
      }
      if (item["earl:test"] && item["earl:test"]["help"] && item["earl:test"]["help"]["dct:description"]) {
        desc = `${desc} \n ${item["earl:test"]["help"]["dct:description"]}`;
      }

      var obj = {
        "file": filename,
        "fileTitle": filetitle,
        "engine": item["earl:assertedBy"],
        "kburl": item["earl:test"]["help"]["url"],
        "kbtitle": item["earl:test"]["help"]["dct:title"],
        "rule": item["earl:test"]["dct:title"],
        "desc": escape(desc),
        "pointer": item["earl:result"]["earl:pointer"],
        "impact": item["earl:test"]["earl:impact"],
        "location": filename,
        "rulesetTags": item["earl:test"]["rulesetTags"],
        "applicableRulesetTag": applicableRulesetTag
      };
      if (item["earl:result"]["earl:pointer"]) {
        var singleCfi = item["earl:result"]["earl:pointer"]["cfi"];
        if (Array.isArray(singleCfi)) { // this should always be true (same with ["earl:result"]["earl:pointer"]["css"])
          singleCfi = singleCfi[0];
        }
        obj.location += "#epubcfi(" + singleCfi + ")";
      }
      if (item["earl:result"]["html"]) {
        obj.html = escape(item["earl:result"]["html"]);
      }
      flatData.push(obj);
    });
  });
  return flatData;
}

// utility function
function addIfUnique(value, list) {
  if (list.indexOf(value) == -1) {
    list.push(value);
  }
}
