function AceReport(data) {
  this.data = data;
  // lists of unique values for the UI filtering
  this.ruleFilter = [];
  this.impactFilter = [];
  this.fileFilter = [];
}

// returns {"filterName": [labels,... ],...}
AceReport.prototype.getFilters = function() {

}

AceReport.prototype.getFileTitle = function(filename) {

}
AceReport.prototype.getFilteredViolations = function(filterName, filterValue) {
  if (filterName === "file") {
    return getViolationsForFile(filterValue);
  }
  else if (filterName == "") {

  }
  else if (filterName == "") {

  }
}
AceReport.prototype.getAllViolations = function() {
  var filtered = [];
  this.data.assertions.forEach(function(assertion) {
    var filtered_ = filtered.concat(assertion.assertions);
    filtered_.forEach(function(item) {
      
    })
  })
}

AcePrototype.getViolationsForFile = function(filename) {

}

AcePrototype.getViolationsForRule = function(rulename) {

}

AcePrototype.getViolationsForImpact = function(impact) {

}
