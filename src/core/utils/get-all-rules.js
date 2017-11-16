'use strict';

const axe = require('axe-core');
const Rules = require('../../checker/rules');

function getAllRules() {
  const AllRules = {};
  AllRules.Engines = [];

  AllRules.Engines.push({
    name: 'aXe',
    rules: axe.getRules(),
  });

  AllRules.Engines.push({
    name: 'Ace',
    rules: new Rules().all,
  });
  // console.log(JSON.stringify(AllRules));
  return AllRules;
}

module.exports.getAllRules = getAllRules;
