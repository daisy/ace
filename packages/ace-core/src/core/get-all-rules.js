'use strict';

const axe = require('axe-core');
const mustache = require('mustache');
const fs = require('fs');

const Rules = require('../checker/rules');


const PATH_TO_RULES_TEMPLATE = `${__dirname}/rules.mustache`;

// fs.writeFileSync('rules.html' , getAllRulesAsHTML());
// console.log(getAllRulesAsJSON());

function mapUrlsToKB(axerules) {
  // TODO: axe helping urls should be map to daisy knowledge database
  // see kbMap in axe2ace.js
  return axerules;
}

function getAllRules() {
  const allRules = {};

  // TODO: Does Ace really uss all rule from axe? Or the rule doc need to be filtered?
  // TODO: Maybe the identifier of rule properties should be normalised?
  // Axe and Ace use the same name convention?
  allRules.engines = {};
  allRules.engines.aXe = { rules: mapUrlsToKB(axe.getRules()) };
  allRules.engines.Ace = { rules: new Rules().all };

  return allRules;
}

function getAllRulesAsHTML() {
  const rulesTemplate = fs.readFileSync(PATH_TO_RULES_TEMPLATE, 'utf-8');
  return mustache.render(rulesTemplate, getAllRules());
}

function getAllRulesAsJSON() {
  return JSON.stringify(getAllRules());
}

module.exports.getAllRulesAsJSON = getAllRulesAsJSON;
module.exports.getAllRulesAsHTML = getAllRulesAsHTML;
module.exports.getAllRules = getAllRules;
