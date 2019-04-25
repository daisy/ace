/* eslint "quote-props": false */

'use strict';

const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

// axe test IDs mapped to our KB pages
const kbMap = {
  'baseUrl': 'http://kb.daisy.org/publishing/',
  'map': {
    'accesskeys': {url: 'docs/html/accesskeys.html', title: 'Access Keys'},
    'area-alt': {url: 'docs/html/maps.html', title: 'Image Maps'},
    'aria-allowed-attr': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-hidden-body': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-required-attr': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-required-children': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-required-parent': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-roles': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-valid-attr-value': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-valid-attr': {url: 'docs/script/aria.html', title: 'ARIA'},
    'button-name': {url: 'docs/html/forms.html', title: 'Forms'},
    'checkboxgroup': {url: 'docs/html/forms.html', title: 'Forms'},
    'color-contrast': {url: 'docs/css/color.html', title: 'Color'},
    'definition-list': {url: 'docs/html/lists.html', title: 'Lists'},
    'dlitem': {url: 'docs/html/lists.html', title: 'Lists'},
    'document-title': {url: 'docs/html/title.html', title: 'Page Title'},
    'duplicate-id': {url: 'docs/html/ids.html', title: 'Identifiers'},
    'empty-heading': {url: 'docs/html/headings.html', title: 'Headings'},
    'epub-type-has-matching-role': {url: 'docs/html/roles.html', title: 'ARIA role'},
    'frame-title-unique': {url: 'docs/html/iframes.html', title: 'Inline Frames'},
    'frame-title': {url: 'docs/html/iframes.html', title: 'Inline Frames'},
    'heading-order': {url: 'docs/html/headings.html', title: 'Headings'},
    'href-no-hash': {url: 'docs/html/links.html', title: 'Links'},
    'html-has-lang': {url: 'docs/html/lang.html', title: 'Language'},
    'html-lang-valid': {url: 'docs/html/lang.html', title: 'Language'},
    'image-alt': {url: 'docs/html/images.html', title: 'Images'},
    'image-redundant-alt': {url: 'docs/html/images.html', title: 'Images'},
    'input-image-alt': {url: 'docs/html/images.html', title: 'Images'},
    'label-title-only': {url: 'docs/html/forms.html', title: 'Forms'},
    'label': {url: 'docs/html/forms.html', title: 'Forms'},
    'layout-table': {url: 'docs/html/tables.html', title: 'Tables'},
    'link-in-text-block': {url: 'docs/html/links.html', title: 'Links'},
    'link-name': {url: 'docs/html/links.html', title: 'Links'},
    'list': {url: 'docs/html/lists.html', title: 'Lists'},
    'listitem': {url: 'docs/html/lists.html', title: 'Lists'},
    'meta-refresh': {url: 'docs/html/meta.html', title: 'Meta'},
    'meta-viewport-large': {url: 'docs/html/meta.html', title: 'Meta'},
    'meta-viewport': {url: 'docs/html/meta.html', title: 'Meta'},
    'object-alt': {url: 'docs/html/object.html', title: 'Object'},
    'p-as-heading': {url: 'docs/html/headings.html', title: 'Headings'},
    'pagebreak-label': {url: 'docs/navigation/pagelist.html', 'title': 'Page Breaks'},
    'radiogroup': {url: 'docs/html/forms.html', title: 'Forms'},
    'scope-attr-valid': {url: 'docs/html/tables.html', title: 'Tables'},
    'server-side-image-map': {url: 'docs/html/maps.html', title: 'Image Maps'},
    'table-duplicate-name': {url: 'docs/html/tables.html', title: 'Tables'},
    'table-fake-caption': {url: 'docs/html/tables.html', title: 'Tables'},
    'td-has-header': {url: 'docs/html/tables.html', title: 'Tables'},
    'td-headers-attr': {url: 'docs/html/tables.html', title: 'Tables'},
    'th-has-data-cells': {url: 'docs/html/tables.html', title: 'Tables'},
    'valid-lang': {url: 'docs/html/lang.html', title: 'Language'},
    'video-caption': {url: 'docs/html/video.html', title: 'Video'},
    'video-description': {url: 'docs/html/video.html', title: 'Video'},
  }
};

  // each report is content doc level
function  axe2ace(spineItem, axeResults) {
  winston.verbose(`Converting aXe results to ace for ${spineItem.relpath}`);

    // the content doc-level assertion
    const assertion = new builders.AssertionBuilder()
      .withSubAssertions()
      .withTestSubject(spineItem.relpath, spineItem.title);
    // process axe's individual checks for a single content document
    axeResults.violations.forEach((violation) => {

      // TODO: remove this debug trace
      // console.log(JSON.stringify(violation, null, 4));

      const kbURL = (kbMap.map.hasOwnProperty(violation.id))
        ? kbMap.baseUrl + kbMap.map[violation.id].url
        : kbMap.baseUrl;
      const kbTitle = (kbMap.map.hasOwnProperty(violation.id))
        ? kbMap.map[violation.id].title
        : '??';
      if (kbTitle == '??') winston.verbose(`Couldn’t find KB key for rule '${violation.id}'`)
      const test = new builders.TestBuilder()
        .withImpact(violation.impact)
        .withTitle(violation.id)
        .withDescription(violation.description)
        .withHelp(kbURL, kbTitle, violation.help)
        .withRulesetTags(violation.tags)
        .build();

      violation.nodes.forEach((node) => {

        let description = node.failureSummary;

        // TODO translate / localize / l10n
        // description = description.replace(localize("axe.failuresummary.none"), "");
        // description = description.replace(localize("axe.failuresummary.any"), "");
        // ?
        // really annoying to duplicate hard-coded strings from Axe-Core into here,
        // but also annoying to add localize() code and JSON resources just for this :(
        // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/core/reporters/helpers/failure-summary.js

        // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/misc/none-failure-summary.json#L4
        description = description.replace("Fix all of the following:", "");
        // https://github.com/dequelabs/axe-core/blob/v3.2.2/locales/fr.json#L664
        description = description.replace("Corriger tous les éléments suivants :", "");
        
        // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/misc/any-failure-summary.json#L4
        description = description.replace("Fix any of the following:", "");
        // https://github.com/dequelabs/axe-core/blob/v3.2.2/locales/fr.json#L656
        description = description.replace("Corriger l’un des éléments suivants :", "");

        description = description.trim();

        let target = node.target;
        let targetCFI = node.targetCFI;
        let html = node.html;

        const allAnyArrayItems = [];
        if (node.any) {
          node.any.forEach((anyItem) => {
            allAnyArrayItems.push(anyItem);
          });
        }
        if (node.all) {
          node.all.forEach((allItem) => {
            allAnyArrayItems.push(allItem);
          });
        }
        allAnyArrayItems.forEach((item) => {
          if (item.relatedNodes) {
            item.relatedNodes.forEach((relatedNode) => {
              if (relatedNode.html && relatedNode.target && relatedNode.target.length && relatedNode.targetCFI && relatedNode.targetCFI.length) {
                html += " <!--##--> ";
                html += relatedNode.html;

                target.push(relatedNode.target[0]);
                targetCFI.push(relatedNode.targetCFI[0]);
              }
            });
          }
        });
  
        assertion.withAssertions(
          new builders.AssertionBuilder()
            .withAssertedBy('aXe')
            .withMode('automatic')
            .withTest(test)
            .withResult(
              new builders.ResultBuilder('fail')
                .withDescription(description)
                .withPointer(target, targetCFI)
                .withHTML(html)
                .build())
            .build());
      });
    });

    const ass = assertion.build();

    // TODO: remove this debug trace
    // console.log(JSON.stringify(ass, null, 4));

    return ass;
}

module.exports.axe2ace = axe2ace;
