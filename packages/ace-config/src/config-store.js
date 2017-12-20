'use strict';

const Conf = require('conf');
const merge = require('lodash.mergewith');

class ConfigStore extends Conf {

  get(key, defaultValue, mergeMode) {
    if (mergeMode && typeof defaultValue === 'object') {
      return merge({}, defaultValue, super.get(key), (obj, val) => {
        if (Array.isArray(obj)) {
          return obj.concat(val);
        }
      });
    }
    return super.get(key, defaultValue);
  }
}

module.exports = ConfigStore;
