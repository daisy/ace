const reportBuilder = require('./json-report-builder.js');
const fs = require('fs-extra');
const winston = require('winston');

// axe test IDs mapped to our KB pages
const kbMap = {
  "baseUrl": "https://daisy.github.io/a11y-kb/",
  "map": {
    "html-has-lang": {url: "docs/html/lang.html", title: "Language"},
    "html-lang-valid": {url: "docs/html/lang.html", title: "Language"},
    "valid-lang": {url: "docs/html/lang.html", title: "Language"},
    "area-alt": {url: "docs/html/maps.html", title: "Image Maps"},
    "server-side-image-map": {url: "docs/html/maps.html", title: "Image Maps"},
    "list": {url: "docs/html/lists.html", title: "Lists"},
    "listitem": {url: "docs/html/lists.html", title: "Lists"},
    "definition-list": {url: "docs/html/lists.html", title: "Lists"},
    "dlitem": {url: "docs/html/lists.html", title: "Lists"},
    "video-caption": {url: "docs/html/video.html", title: "Video"},
    "video-description": {url: "docs/html/video.html", title: "Video"},
    "table-duplicate-name": {url: "docs/html/tables.html", title: "Tables"},
    "table-fake-caption": {url: "docs/html/tables.html", title: "Tables"},
    "td-has-header": {url: "docs/html/tables.html", title: "Tables"},
    "td-headers-attr": {url: "docs/html/tables.html", title: "Tables"},
    "th-has-data-cells": {url: "docs/html/tables.html", title: "Tables"},
    "layout-table": {url: "docs/html/tables.html", title: "Tables"},
    "scope-attr-valid": {url: "docs/html/tables.html", title: "Tables"},
    "image-alt": {url: "docs/html/images.html", title: "Images"},
    "image-redundant-alt": {url: "docs/html/images.html", title: "Images"},
    "input-image-alt": {url: "docs/html/images.html", title: "Images"},
    "frame-title-unique": {url: "docs/html/iframes.html", title: "Inline Frames"},
    "frame-title": {url: "docs/html/iframes.html", title: "Inline Frames"},
    "meta-refresh": {url: "docs/html/meta.html", title: "Meta"},
    "meta-viewport-large": {url: "docs/html/meta.html", title: "Meta"},
    "meta-viewport": {url: "docs/html/meta.html", title: "Meta"},
    "aria-allowed-attr": {url: "docs/script/aria.html", title: "ARIA"},
    "aria-required-attr": {url: "docs/script/aria.html", title: "ARIA"},
    "aria-required-children": {url: "docs/script/aria.html", title: "ARIA"},
    "aria-required-parent": {url: "docs/script/aria.html", title: "ARIA"},
    "aria-roles": {url: "docs/script/aria.html", title: "ARIA"},
    "aria-valid-attr-value": {url: "docs/script/aria.html", title: "ARIA"},
    "aria-valid-attr": {url: "docs/script/aria.html", title: "ARIA"},
    "aria-hidden-body": {url: "docs/script/aria.html", title: "ARIA"},
    "empty-heading": {url: "docs/html/headings.html", title: "Headings"},
    "heading-order": {url: "docs/html/headings.html", title: "Headings"},
    "p-as-heading": {url: "docs/html/headings.html", title: "Headings"},
    "document-title": {url: "docs/html/title.html", title: "Page Title"},
    "duplicate-id": {url: "docs/html/ids.html", title: "Identifiers"},
    "radiogroup": {url: "docs/html/forms.html", title: "Forms"},
    "checkboxgroup": {url: "docs/html/forms.html", title: "Forms"},
    "label-title-only": {url: "docs/html/forms.html", title: "Forms"},
    "label": {url: "docs/html/forms.html", title: "Forms"},
    "button-name": {url: "docs/html/forms.html", title: "Forms"},
    "accesskeys": {url: "docs/html/accesskeys.html", title: "Access Keys"},
    "color-contrast": {url: "docs/css/color.html", title: "Color"},
    "link-in-text-block": {url: "docs/html/links.html", title: "Links"},
    "link-name": {url: "docs/html/links.html", title: "Links"},
    "href-no-hash": {url: "docs/html/links.html", title: "Links"},
    "object-alt": {url: "docs/html/object.html", title: "Object"}
  }
};


module.exports = {
    // each report is content doc level
    axe2ace: function (spineItem, axeResults) {
        winston.verbose("Converting aXe results to ace for " + spineItem.relpath);

        // the top-level assertion
        var contentDocAssertion = new reportBuilder.ContentDocAssertion()
                .withTestSubject(spineItem.relpath, spineItem.title);

        // process axe's individual checks for a single content document
        axeResults.violations.forEach(function(violation) {
            var test = new reportBuilder.Test()
                .withImpact(violation.impact)
                .withTitle(violation.id)
                .withDescription(violation.description)
                .withHelp(kbMap.baseUrl + kbMap.map[violation.id].url, kbMap.map[violation.id].title);

            violation.nodes.forEach(function (node) {
                var result = new reportBuilder.Result()
                    .withOutcome("fail")
                    .withDescription(node.failureSummary)
                    .withPointer(node.targetCFI, node.target);

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
