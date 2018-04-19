'use strict';

const escape = require('escape-html');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// generate the html report and return it as a string
module.exports = function generateHtmlReport(reportData) {

  return new Promise((resolve, reject) => {
    var flatListOfViolations = createFlatListOfViolations(reportData.assertions);
    var violationStats = collectViolationStats(flatListOfViolations);
    var violationFilters = createViolationFilters(flatListOfViolations);
    var rulesetTagLabels = {
      'wcag2a': 'WCAG 2.0 A',
      'wcag2aa': 'WCAG 2.0 AA',
      'EPUB': 'EPUB',
      'best-practice': 'Best Practice',
      'other': 'Other'
    };

    // return 5 data cells for each ruleset: critical, serious, moderate, minor, total
    // a ruleset can be "wcag2a", "wcag2aa", "EPUB", "other", or "total" (all rulesets)
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
        // use nicer labels for ruleset options
        if (rule == "ruleset") {
          filterOptions += "<option value='" + value + "'>" + rulesetTagLabels[value] + "</option>";
        }
        else {
          filterOptions += "<option value='" + value + "'>" + value + "</option>";
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
        htmlStr += `<tr>
        <td><span class='${violation['impact']}'>${violation['impact']}</span></td>
        <td><span class='ruleset'>${rulesetTagLabels[violation['applicableRulesetTag']]}</span></td>
        <td>${violation['rule']}<br/><br/><span class='engine'>${violation['engine']}</span></td>
        <td><em>\"${violation['fileTitle']}\"<br/><br/><code class='location'>${violation['location']}</code>`;

        if (violation.html) {
          htmlStr +=`<br/><br/><div class='snippet'>Snippet:<code>${violation.html.trim()}</code></div>`;
        }

        htmlStr += "</td>";


        var desc = violation["desc"];
        desc = desc.replace("Fix all of the following:", "");
        desc = desc.replace("Fix any of the following:", "");

        var detailsArr = desc.split("\n");
        var listStr = '';
        detailsArr.forEach(function(item) {
          if (item != "") {
            listStr += `<li>${unescape(item)}</li>`;
          }
        });

        htmlStr += `<td class='details'>
        <ul>${listStr}</ul>
        <p><a href='${violation['kburl']}' target='_blank'>Learn more about ${violation['kbtitle']}</a></p>
        </td>`;

        htmlStr += "</tr>";
      });
      return new handlebars.SafeString(htmlStr);
    });

    handlebars.registerHelper('insertConformsToRow', function(options) {
      if (reportData['earl:testSubject'].hasOwnProperty('links') &&
          reportData['earl:testSubject']['links'].hasOwnProperty('dcterms:conformsTo')) {
            var conformsTo = reportData['earl:testSubject']['links']['dcterms:conformsTo'];
        return new handlebars.SafeString(`<tr><td>dcterms:conformsTo</td>
          <td><a href="${conformsTo}" target="_blank">${conformsTo}</a></td></tr>`);
      }
      else {
        return new handlebars.SafeString('');
      }
    });

    const content = fs.readFileSync(path.join(__dirname, "./report-template.handlebars")).toString();
    var template = handlebars.compile(content);
    var result = template(reportData);
    resolve(result);
  });

};

// summarize the violation ruleset and impact data
function collectViolationStats(flatListOfViolations) {
  var rulesetTags = ['wcag2a', 'wcag2aa', 'EPUB', 'best-practice'];

  var summaryData = {
    'wcag2a': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
    'wcag2aa': {'critical': 0, 'serious': 0, 'moderate': 0, 'minor': 0, 'total': 0},
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
    summaryData['total'][key] += summaryData['wcag2a'][key]
      + summaryData['wcag2aa'][key]
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
  var rulesetTags = ['wcag2a', 'wcag2aa', 'EPUB', 'best-practice']; // applicable ruleset tags

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

      var obj = {
        "file": filename,
        "filetitle": filetitle,
        "engine": item["earl:assertedBy"],
        "kburl": item["earl:test"]["help"]["url"],
        "kbtitle": item["earl:test"]["help"]["dct:title"],
        "rule": item["earl:test"]["dct:title"],
        "desc": escape(item["earl:result"]["dct:description"]),
        "pointer": item["earl:result"]["earl:pointer"],
        "impact": item["earl:test"]["earl:impact"],
        "location": filename,
        "rulesetTags": item["earl:test"]["rulesetTags"],
        "applicableRulesetTag": applicableRulesetTag
      };
      if (item["earl:result"]["earl:pointer"]) {
        obj.location += "#epubcfi(" + item["earl:result"]["earl:pointer"]["cfi"] + ")";
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
