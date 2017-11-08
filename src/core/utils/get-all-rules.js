'use strict';

const axe = require('axe-core');


function getAllRules() {
  const AllRules = {};
  AllRules.Engines = [];

  AllRules.Engines.push({
    name: 'aXe',
    rules: axe.getRules(),
  });

  AllRules.Engines.push({
    name: 'Ace',
    rules: [],
  });

  console.log(JSON.stringify(AllRules));
}

getAllRules();

module.exports.getAllRules = getAllRules;
