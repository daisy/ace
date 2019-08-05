/* eslint "quote-props": false */

'use strict';

const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

const { localize, setCurrentLanguage } = require('./l10n/localize').localizer;

  // each report is content doc level
function  axe2ace(spineItem, axeResults, lang) {
  winston.verbose(`Converting aXe results to ace for ${spineItem.relpath}`);

    if (lang) {
      setCurrentLanguage(lang);
    }

    // axe test IDs mapped to our KB pages
    const kbMap = {
      'baseUrl': 'http://kb.daisy.org/publishing/',
      'map': {
        'accesskeys': {url: 'docs/html/accesskeys.html', title: localize("kb.accesskeys")},
        'area-alt': {url: 'docs/html/maps.html', title: localize("kb.area-alt")},
        'aria-allowed-attr': {url: 'docs/script/aria.html', title: localize("kb.aria-allowed-attr")},
        'aria-hidden-body': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},
        'aria-required-attr': {url: 'docs/script/aria.html', title: localize("kb.aria-required-attr")},
        'aria-required-children': {url: 'docs/script/aria.html', title: localize("kb.aria-required-children")},
        'aria-required-parent': {url: 'docs/script/aria.html', title: localize("kb.aria-required-parent")},
        'aria-roles': {url: 'docs/script/aria.html', title: localize("kb.aria-roles")},
        'aria-valid-attr-value': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr-value")},
        'aria-valid-attr': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},
        'button-name': {url: 'docs/html/forms.html', title: localize("kb.button-name")},
        'checkboxgroup': {url: 'docs/html/forms.html', title: localize("kb.checkboxgroup")},
        'color-contrast': {url: 'docs/css/color.html', title: localize("kb.color-contrast")},
        'definition-list': {url: 'docs/html/lists.html', title: localize("kb.definition-list")},
        'dlitem': {url: 'docs/html/lists.html', title: localize("kb.dlitem")},
        'document-title': {url: 'docs/html/title.html', title: localize("kb.document-title")},
        'duplicate-id': {url: 'docs/html/ids.html', title: localize("kb.duplicate-id")},
        'empty-heading': {url: 'docs/html/headings.html', title: localize("kb.empty-heading")},
        'epub-type-has-matching-role': {url: 'docs/html/roles.html', title: localize("kb.epub-type-has-matching-role")},
        'frame-title-unique': {url: 'docs/html/iframes.html', title: localize("kb.frame-title-unique")},
        'frame-title': {url: 'docs/html/iframes.html', title: localize("kb.frame-title")},
        'heading-order': {url: 'docs/html/headings.html', title: localize("kb.heading-order")},
        'href-no-hash': {url: 'docs/html/links.html', title: localize("kb.href-no-hash")},
        'html-has-lang': {url: 'docs/html/lang.html', title: localize("kb.html-has-lang")},
        'html-lang-valid': {url: 'docs/html/lang.html', title: localize("kb.html-lang-valid")},
        'image-alt': {url: 'docs/html/images.html', title: localize("kb.image-alt")},
        'image-redundant-alt': {url: 'docs/html/images.html', title: localize("kb.image-redundant-alt")},
        'input-image-alt': {url: 'docs/html/images.html', title: localize("kb.input-image-alt")},
        'label-title-only': {url: 'docs/html/forms.html', title: localize("kb.label-title-only")},
        'label': {url: 'docs/html/forms.html', title: localize("kb.label")},
        'layout-table': {url: 'docs/html/tables.html', title: localize("kb.layout-table")},
        'link-in-text-block': {url: 'docs/html/links.html', title: localize("kb.link-in-text-block")},
        'link-name': {url: 'docs/html/links.html', title: localize("kb.link-name")},
        'list': {url: 'docs/html/lists.html', title: localize("kb.list")},
        'listitem': {url: 'docs/html/lists.html', title: localize("kb.listitem")},
        'meta-refresh': {url: 'docs/html/meta.html', title: localize("kb.meta-refresh")},
        'meta-viewport-large': {url: 'docs/html/meta.html', title: localize("kb.meta-viewport-large")},
        'meta-viewport': {url: 'docs/html/meta.html', title: localize("kb.meta-viewport")},
        'object-alt': {url: 'docs/html/object.html', title: localize("kb.object-alt")},
        'p-as-heading': {url: 'docs/html/headings.html', title: localize("kb.p-as-heading")},
        'pagebreak-label': {url: 'docs/navigation/pagelist.html', title: localize("kb.pagebreak-label")},
        'radiogroup': {url: 'docs/html/forms.html', title: localize("kb.radiogroup")},
        'scope-attr-valid': {url: 'docs/html/tables.html', title: localize("kb.scope-attr-valid")},
        'server-side-image-map': {url: 'docs/html/maps.html', title: localize("kb.server-side-image-map")},
        'table-duplicate-name': {url: 'docs/html/tables.html', title: localize("kb.table-duplicate-name")},
        'table-fake-caption': {url: 'docs/html/tables.html', title: localize("kb.table-fake-caption")},
        'td-has-header': {url: 'docs/html/tables.html', title: localize("kb.td-has-header")},
        'td-headers-attr': {url: 'docs/html/tables.html', title: localize("kb.td-headers-attr")},
        'th-has-data-cells': {url: 'docs/html/tables.html', title: localize("kb.th-has-data-cells")},
        'valid-lang': {url: 'docs/html/lang.html', title: localize("kb.valid-lang")},
        'video-caption': {url: 'docs/html/video.html', title: localize("kb.video-caption")},
        'video-description': {url: 'docs/html/video.html', title: localize("kb.video-description")},
      }
    };

    // the content doc-level assertion
    const assertion = new builders.AssertionBuilder()
      .withSubAssertions()
      .withTestSubject(spineItem.relpath, spineItem.title);
    // process axe's individual checks for a single content document
    axeResults.violations.forEach((violation) => {

      const kbURL = (kbMap.map.hasOwnProperty(violation.id))
        ? kbMap.baseUrl + kbMap.map[violation.id].url
        : kbMap.baseUrl;
      let kbTitle = (kbMap.map.hasOwnProperty(violation.id))
        ? kbMap.map[violation.id].title
        : '??';
      if (kbTitle == '??') {
        winston.verbose(`Couldn’t find KB key for rule '${violation.id}'`);
        kbTitle = localize("nokb");
      }
      const test = new builders.TestBuilder()
        .withImpact(violation.impact)
        .withTitle(violation.id)
        .withDescription(violation.description)
        .withHelp(kbURL, kbTitle, violation.help)
        .withRulesetTags(violation.tags)
        .build();

      violation.nodes.forEach((node) => {

        let description = node.failureSummary;

        // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/core/reporters/helpers/failure-summary.js
        // // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/misc/none-failure-summary.json#L4
        // Fix all of the following:
        // // https://github.com/dequelabs/axe-core/blob/v3.2.2/locales/fr.json#L664
        // Corriger tous les éléments suivants :
        // // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/misc/any-failure-summary.json#L4
        // Fix any of the following:
        // // https://github.com/dequelabs/axe-core/blob/v3.2.2/locales/fr.json#L656
        // Corriger l’un des éléments suivants :

        // TODO: this is a hacky way to fix the Axe bug that forces the wrong language (en) into `failureSummary`.
        description = description.replace(/Fix any of the following:/g, "");
        description = description.replace(/Fix all of the following:/g, "");
        description = description.trim();
        description = description.replace(/[\n]+/g, "\n");
        description = description.replace(/\n/g, " --- ");
        description = description.replace(/\s+/g, " ");
        description = description.replace(/ --- /g, "\n");

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
    return ass;
}

module.exports.axe2ace = axe2ace;
