const reportBuilder = require('./json-report-builder.js');


module.exports = {
    // each report is content doc level
    axe2ace: function (contentDocUrl, axeResults) {
        //console.log(axeResults);

        // the top-level assertion
        var contentDocAssertion = new reportBuilder.ContentDocAssertion()
                .withTestSubject(contentDocUrl);

        // process axe's individual checks for a single content document
        axeResults.axe.violations.forEach(function(violation) {
            var test = new reportBuilder.Test()
                .withImpact(violation.impact)
                .withTitle(violation.id)
                .withDescription(violation.description)
                .withHelpUrl(violation.helpUrl);
            
            violation.nodes.forEach(function (node) {
                var result = new reportBuilder.Result()
                    .withOutcome("fail")
                    .withDescription(node.failureSummary)
                    .withPointer(node.target, node.targetCFI);
                
                var assertion = new reportBuilder.SingleCheckAssertion()
                    .withAssertedBy("aXe")
                    .withMode("automatic")
                    .withTest(test)
                    .withResult(result);

                contentDocAssertion.withAssertion(assertion);
            });
        });

        return contentDocAssertion;
    }
}

