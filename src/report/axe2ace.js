/* eslint "quote-props": false */

'use strict';

const builders = require('./report-builders.js');
const winston = require('winston');

// axe test IDs mapped to our KB pages
const kbMap = {
  'baseUrl': 'http://kb.daisy.org/publishing/',
  'map': {
    'pagebreak-label': {url: 'docs/navigation/pagelist.html', 'title': 'Page Breaks'},
    'html-has-lang': {url: 'docs/html/lang.html', title: 'Language'},
    'html-lang-valid': {url: 'docs/html/lang.html', title: 'Language'},
    'valid-lang': {url: 'docs/html/lang.html', title: 'Language'},
    'area-alt': {url: 'docs/html/maps.html', title: 'Image Maps'},
    'server-side-image-map': {url: 'docs/html/maps.html', title: 'Image Maps'},
    'list': {url: 'docs/html/lists.html', title: 'Lists'},
    'listitem': {url: 'docs/html/lists.html', title: 'Lists'},
    'definition-list': {url: 'docs/html/lists.html', title: 'Lists'},
    'dlitem': {url: 'docs/html/lists.html', title: 'Lists'},
    'video-caption': {url: 'docs/html/video.html', title: 'Video'},
    'video-description': {url: 'docs/html/video.html', title: 'Video'},
    'table-duplicate-name': {url: 'docs/html/tables.html', title: 'Tables'},
    'table-fake-caption': {url: 'docs/html/tables.html', title: 'Tables'},
    'td-has-header': {url: 'docs/html/tables.html', title: 'Tables'},
    'td-headers-attr': {url: 'docs/html/tables.html', title: 'Tables'},
    'th-has-data-cells': {url: 'docs/html/tables.html', title: 'Tables'},
    'layout-table': {url: 'docs/html/tables.html', title: 'Tables'},
    'scope-attr-valid': {url: 'docs/html/tables.html', title: 'Tables'},
    'image-alt': {url: 'docs/html/images.html', title: 'Images'},
    'image-redundant-alt': {url: 'docs/html/images.html', title: 'Images'},
    'input-image-alt': {url: 'docs/html/images.html', title: 'Images'},
    'frame-title-unique': {url: 'docs/html/iframes.html', title: 'Inline Frames'},
    'frame-title': {url: 'docs/html/iframes.html', title: 'Inline Frames'},
    'meta-refresh': {url: 'docs/html/meta.html', title: 'Meta'},
    'meta-viewport-large': {url: 'docs/html/meta.html', title: 'Meta'},
    'meta-viewport': {url: 'docs/html/meta.html', title: 'Meta'},
    'aria-allowed-attr': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-required-attr': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-required-children': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-required-parent': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-roles': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-valid-attr-value': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-valid-attr': {url: 'docs/script/aria.html', title: 'ARIA'},
    'aria-hidden-body': {url: 'docs/script/aria.html', title: 'ARIA'},
    'empty-heading': {url: 'docs/html/headings.html', title: 'Headings'},
    'heading-order': {url: 'docs/html/headings.html', title: 'Headings'},
    'p-as-heading': {url: 'docs/html/headings.html', title: 'Headings'},
    'document-title': {url: 'docs/html/title.html', title: 'Page Title'},
    'duplicate-id': {url: 'docs/html/ids.html', title: 'Identifiers'},
    'radiogroup': {url: 'docs/html/forms.html', title: 'Forms'},
    'checkboxgroup': {url: 'docs/html/forms.html', title: 'Forms'},
    'label-title-only': {url: 'docs/html/forms.html', title: 'Forms'},
    'label': {url: 'docs/html/forms.html', title: 'Forms'},
    'button-name': {url: 'docs/html/forms.html', title: 'Forms'},
    'accesskeys': {url: 'docs/html/accesskeys.html', title: 'Access Keys'},
    'color-contrast': {url: 'docs/css/color.html', title: 'Color'},
    'link-in-text-block': {url: 'docs/html/links.html', title: 'Links'},
    'link-name': {url: 'docs/html/links.html', title: 'Links'},
    'href-no-hash': {url: 'docs/html/links.html', title: 'Links'},
    'object-alt': {url: 'docs/html/object.html', title: 'Object'}
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
      const kbURL = (kbMap.map.hasOwnProperty(violation.id))
        ? kbMap.baseUrl + kbMap.map[violation.id].url
        : kbMap.baseUrl;
      const kbTitle = (kbMap.map.hasOwnProperty(violation.id))
        ? kbMap.map[violation.id].title
        : 'Unknown';
      if (kbTitle == 'Unknown') winston.verbose(`Couldn’t find KB key for rule '${violation.id}'`)
      const test = new builders.TestBuilder()
        .withImpact(violation.impact)
        .withTitle(violation.id)
        .withDescription(violation.description)
        .withHelp(kbURL, kbTitle)
        .withRulesetTags(violation.tags)
        .build();
      violation.nodes.forEach(node => assertion.withAssertions(
        new builders.AssertionBuilder()
          .withAssertedBy('aXe')
          .withMode('automatic')
          .withTest(test)
          .withResult(
            new builders.ResultBuilder('fail')
              .withDescription(node.failureSummary)
              .withPointer(node.target, node.targetCFI)
              .build())
          .build()));
      });

    return assertion.build();
}

module.exports.axe2ace = axe2ace;
