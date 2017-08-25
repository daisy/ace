// report objects

// static
var AceSoftwareDescription = {
    "@type": "earl:software",
    "doap:name": "DAISY Ace",
    "doap:description": "DAISY Accessibility Checker for EPUB",
    "doap:homepage": "http://ace.daisy.org",
    "doap:created": "2017-07-01",
    "doap:release": {"doap:revision": "v0.2.0"}
}
// create properties with our json vocabulary
function withOutcome (obj, outcome) {
    obj["earl:outcome"] = outcome;
    return obj;
}
function withDescription (obj, description) {
    obj["dct:description"] = description;
    return obj;
}
function withPointer(obj, cfi, css) {
    obj["earl:pointer"] = {"cfi": cfi, "css": css};
    return obj;
}
function withType(obj, type) {
    obj["@type"] = type;
    return obj;
}
function withAssertedBy(obj, assertor) {
    obj["earl:assertedBy"] = assertor;
    return obj;
}
function withTestSubject (obj, url, title = '', identifier = '', metadata = null) {
    obj["earl:testSubject"] = {
      "url": url
    };
    if (title.length > 0) {
        obj["earl:testSubject"]["dct:title"] = title;
    }
    if (identifier.length > 0) {
      obj["earl:testSubject"]["dct:identifier"] = identifier;
    }
    if (metadata != undefined && metadata != null) {
      obj["earl:testSubject"].metadata = metadata;
    }
    return obj;
}

// add an assertion and recalc the top-level result
function withAssertion(obj, assertion) {
    if (!("assertions" in obj)) {
        obj["assertions"] = [];
    }
    obj["assertions"].push(assertion);
    withResult(obj, calculateResult(obj.assertions));

    return obj;
}
function withResult(obj, result) {
    obj["earl:result"] = result;
    return obj;
}
function withMode(obj, mode) {
    obj["earl:mode"] = mode;
    return obj;
}
function withTitle(obj, title) {
    obj["dct:title"] = title;
    return obj;
}
function withDescription(obj, description) {
    obj["dct:description"] = description;
    return obj;
}
function withDate(obj, date) {
    obj["dct:date"] = date;
    return obj;
}
function withContext(obj, context) {
    obj["@context"] = context;
    return obj;
}
function withTest(obj, test) {
    obj["earl:test"] = test;
    return obj;
}
function withImpact(obj, impact) {
    obj["earl:impact"] = impact;
    return obj;
}
function withHelpUrl(obj, helpUrl) {
    obj["helpUrl"] = helpUrl;
    return obj;
}
function withHeadingsOutline(obj, outline) {
  obj.outlines = obj.outlines || {};
  obj.outlines.headings = outline;
  return obj;
}
function withHTMLOutline(obj, outline) {
  obj.outlines = obj.outlines || {};
  obj.outlines.html = outline;
  return obj;
}
function withEPUBOutline(obj, outline) {
  obj.outlines = obj.outlines || {};
  obj.outlines.toc = outline;
  return obj;
}
function withImages(obj, images) {
  obj.data = obj.data || {};
  obj.data.images = images;
  return obj;
}


// helper function
function calculateResult(assertions) {
    var outcome = "pass";
    assertions.forEach(function(assertion) {
      if ('earl:result' in assertion &&
          assertion['earl:result']['earl:outcome'] === "fail") {
          outcome = "fail";
          return;
      }
    });
    var result = new Result().withOutcome(outcome);
    return result;
}



// main report objects: Report, Result, ContentDocAssertion, SingleCheckAssertion, Test

function Report() {
    withType(this, "earl:report");
    withContext(this, "http://ace.daisy.org/ns/ace-report.jsonld");
    withAssertedBy(this, AceSoftwareDescription);
    withDate(this, new Date().toLocaleString());
}
Report.prototype.withTitle = function(title) {
    return withTitle(this, title);
}
Report.prototype.withDescription = function(description) {
    return withDescription(this, description);
}
Report.prototype.withTestSubject = function(url, title, identifier, metadata) {
    return withTestSubject(this, url, title, identifier, metadata);
}
Report.prototype.withAssertion = function(assertions) {
    return withAssertion(this, assertions);
}
Report.prototype.withHeadingsOutline = function(outline) {
    return withHeadingsOutline(this, outline);
}
Report.prototype.withHTMLOutline = function(outline) {
    return withHTMLOutline(this, outline);
}
Report.prototype.withEPUBOutline = function(outline) {
    return withEPUBOutline(this, outline);
}
Report.prototype.withImages = function(images) {
    return withImages(this, images);
}


function Result() {
}
Result.prototype.withOutcome = function(outcome) {
    return withOutcome(this, outcome);
}
Result.prototype.withDescription = function(description) {
    return withDescription(this, description);
}
Result.prototype.withPointer = function(css, cfi) {
    return withPointer(this, css, cfi);
}


function ContentDocAssertion() {
    withType(this, "earl:assertion");
}
ContentDocAssertion.prototype.withTestSubject = function(url, title) {
    return withTestSubject(this, url, title);
}
ContentDocAssertion.prototype.withAssertion = function(assertions) {
    return withAssertion(this, assertions);
}

function SingleCheckAssertion() {
    withType(this, "earl:assertion");
}
SingleCheckAssertion.prototype.withAssertedBy = function(assertedBy) {
    return withAssertedBy(this, assertedBy);
}
SingleCheckAssertion.prototype.withTest = function(test) {
    return withTest(this, test);
}
SingleCheckAssertion.prototype.withResult = function(result) {
    return withResult(this, result);
}
SingleCheckAssertion.prototype.withMode = function(mode) {
    return withMode(this, mode);
}

function Test() {
}
Test.prototype.withImpact = function(impact) {
    return withImpact(this, impact);
}
Test.prototype.withTitle = function(title) {
    return withTitle(this, title);
}
Test.prototype.withDescription = function(description) {
    return withDescription(this, description);
}
Test.prototype.withHelpUrl = function(helpUrl) {
    return withHelpUrl(this, helpUrl);
}

module.exports.Report = Report;
module.exports.Test = Test;
module.exports.SingleCheckAssertion = SingleCheckAssertion;
module.exports.ContentDocAssertion = ContentDocAssertion;
module.exports.Test = Test;
module.exports.Result = Result;
