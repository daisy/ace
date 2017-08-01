const reportBuilder = require('./json-report-builder.js');
const fs = require('fs-extra');


// axe test IDs mapped to our KB pages
const kbMap = {
  "baseUrl": "https://daisy.github.io/a11y-kb/",
  "map": {
    "html-has-lang": "docs/html/lang.html",
    "html-lang-valid": "docs/html/lang.html",
    "valid-lang": "docs/html/lang.html",
    "area-alt": "docs/html/maps.html",
    "server-side-image-map": "docs/html/maps.html",
    "list": "docs/html/lists.html",
    "listitem": "docs/html/lists.html",
    "definition-list": "docs/html/lists.html",
    "dlitem": "docs/html/lists.html",
    "video-caption": "docs/html/video.html",
    "video-description": "docs/html/video.html",
    "table-duplicate-name": "docs/html/tables.html",
    "table-fake-caption": "docs/html/tables.html",
    "td-has-header": "docs/html/tables.html",
    "td-headers-attr": "docs/html/tables.html",
    "th-has-data-cells": "docs/html/tables.html",
    "layout-table": "docs/html/tables.html",
    "scope-attr-valid": " docs/html/tables.html",
    "image-alt": "docs/html/images/html",
    "image-redundant-alt": "docs/html/images.html",
    "input-image-alt": "docs/html/images.html",
    "frame-title-unique": "docs/html/iframes.html",
    "frame-title": "docs/html/iframes.html",
    "meta-refresh": "docs/html/meta.html",
    "meta-viewport-large": "docs/html/meta.html",
    "meta-viewport": "docs/html/meta.html",
    "aria-allowed-attr": "docs/scripting/aria.html",
    "aria-required-attr": "docs/scripting/aria.html",
    "aria-required-children": "docs/scripting/aria.html",
    "aria-required-parent": "docs/scripting/aria.html",
    "aria-roles": "docs/scripting/aria.html",
    "aria-valid-attr-value": "docs/scripting/aria.html",
    "aria-valid-attr": "docs/scripting/aria.html",
    "aria-hidden-body": "docs/scripting/aria.html",
    "empty-heading": "docs/html/headings.html",
    "heading-order": "docs/html/headings.html",
    "p-as-heading": "docs/html/headings.html",
    "document-title": "docs/html/title.html",
    "duplicate-id": "docs/html/ids.html",
    "radiogroup": "docs/html/controls.html",
    "checkboxgroup": "docs/html/controls.html",
    "label-title-only": "docs/html/controls.html",
    "label": "docs/html/controls.html",
    "button-name": "docs/html/controls.html",
    "accesskeys": "docs/html/accesskeys.html",
    "color-contrast": "docs/css/color.html",
    "link-in-text-block": "docs/html/links.html",
    "link-name": "docs/html/links.html",
    "href-no-hash": "docs/html/links.html",
    "object-alt": "docs/html/object.html"
  }
};


module.exports = {
    // each report is content doc level
    axe2ace: function (spineItem, axeResults) {
      if (axeResults.axe.violations.length == 0) {
        return null;
      }
        // the top-level assertion
        var contentDocAssertion = new reportBuilder.ContentDocAssertion()
                .withTestSubject(spineItem.relpath, spineItem.title);

        // process axe's individual checks for a single content document
        axeResults.axe.violations.forEach(function(violation) {
            var test = new reportBuilder.Test()
                .withImpact(violation.impact)
                .withTitle(violation.id)
                .withDescription(violation.description)
                .withHelpUrl(kbMap.baseUrl + kbMap.map[violation.id]);

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
