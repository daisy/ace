// report objects 

// static
var AceSoftwareDescription = {
    "@type": "software",
    "doap:name": "DAISY Ace",
    "doap:description": "DAISY Accessibility Checker for EPUB",
    "doap:homepage": "http://ace.daisy.org",
    "doap:created": "2017-07-01",
    "release": {"doap:revision": "v0.2.0"}
}
// create properties with our json vocabulary
function withOutcome (obj, outcome) {
    obj["outcome"] = outcome;
    return obj;
}
function withDescription (obj, description) {
    obj["dct:description"] = description;
    return obj;
}
function withPointer(obj, cfi, css) {
    obj["result"] = {"cfi": cfi, "css": css};
    return obj;
}
function withType(obj, type) {
    obj["@type"] = type;
    return obj;
}
function withAssertedBy(obj, assertor) {
    obj["assertedBy"] = assertor;
    return obj;
}
function withTestSubject (obj, testSubject) {
    obj["testSubject"] = testSubject;
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
    obj["result"] = result;
    return obj;
}
function withMode(obj, mode) {
    obj["mode"] = mode;
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
    obj["dct:Date"] = date;
    return obj;
}
function withContext(obj, context) {
    obj["@context"] = context;
    return obj;
}
function withTest(obj, test) {
    obj["test"] = test;
    return obj;
}
function withImpact(obj, impact) {
    obj["impact"] = impact;
    return obj;
}
function withHelpUrl(obj, helpUrl) {
    obj["helpUrl"] = helpUrl;
    return obj;
}

// helper function
function calculateResult(assertions) {
    var outcome = "pass";
    assertions.forEach(function(assertion) {
        if (assertion.result.outcome === "fail") {
            outcome = "fail";
            return;
        }
    });
    var result = new Result().withOutcome(outcome);
    return result;
}



// main report objects: Report, Result, ContentDocAssertion, SingleCheckAssertion, Test

function Report() {
    withType(this, "Report");
    withContext(this, {});
    withAssertedBy(this, AceSoftwareDescription);
    withDate(this, new Date().toLocaleString());
}
Report.prototype.withTitle = function(title) {
    return withTitle(this, title);
}
Report.prototype.withDescription = function(description) {
    return withDescription(this, description);
}
Report.prototype.withTestSubject = function(testSubject) {
    return withTestSubject(this, testSubject);
}
Report.prototype.withAssertion = function(assertions) {
    return withAssertion(this, assertions);
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
    withType(this, "Assertion");
}
ContentDocAssertion.prototype.withTestSubject = function(testSubject) {
    return withTestSubject(this, testSubject);
}
ContentDocAssertion.prototype.withAssertion = function(assertions) {
    return withAssertion(this, assertions);
}

function SingleCheckAssertion() {
    withType(this, "Assertion");
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


