'use strict';

const envPaths = require('env-paths');
const constants = require('./constants');
const ConfigStore = require('./config-store');

const paths = envPaths(constants.dirname, { suffix: null });

const config = new ConfigStore({
  cwd: paths.config,
});

module.exports = {
  config,
  constants: Object.freeze(constants),
  paths,
};
