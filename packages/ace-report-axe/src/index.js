/* eslint "quote-props": false */

'use strict';

const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

const { localize, setCurrentLanguage } = require('./l10n/localize').localizer;

const axeRulesKbMapping = require('./axe-rules-kb-mapping').kbMap;

  // each report is content doc level
function  axe2ace(spineItem, axeResults, lang) {
  winston.verbose(`Converting aXe results to ace for ${spineItem.relpath}`);

    if (lang) {
      setCurrentLanguage(lang);
    }

    const kbMap = axeRulesKbMapping;

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
