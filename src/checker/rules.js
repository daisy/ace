/* eslint-disable class-methods-use-this */

'use strict';

const glob = require('glob');
const path = require('path');
const winston = require('winston');

const rules = [];
const ruleProperties = ['title', 'testDesc', 'kbTitle', 'resDesc', 'kbPath', 'impact', 'tag', 'spec', 'check'];

function isRuleWellDefined(rule) {
  if (Object.keys(rule).length !== ruleProperties.length) {
    winston.error(`Rule format not valid: \n${JSON.stringify(rule)}`);
    return false;
  }
  ruleProperties.forEach((prop) => {
    if (!Object.prototype.hasOwnProperty.call(rule, prop)) {
      winston.error(`Property ${prop} not found! \n${JSON.stringify(rule)}`);
      return false;
    }
    return true;
  });

  if (rule.check.toString().length === 0) {
    winston.error(`Rule-property 'check' should never be empty. \n${JSON.stringify(rule)}`);
    return false;
  }
  return true;
}


class Rules {

  constructor() {
    this.load();
  }

  load() {
    // use glob patterns to parse rules
    const files = glob.sync('./**/*.json', { cwd: __dirname });
    files.forEach((file) => {
      const rule = require(file);
      rule.check = path.resolve(__dirname, path.dirname(file), rule.check);
      this.add(rule);
    });
  }
  // TODO: Is it needed to define an own Rule class?
  add(rule) {
    if (isRuleWellDefined(rule)) {
      rules.push(rule);
    } else {
      // TODO: Structure of some rule is not valid. Stop the whole processing?
      // process.exit(1);
    }
  }

  get all() {
    // console.log(JSON.stringify(rules));
    return rules;
  }

}

module.exports = Rules;
