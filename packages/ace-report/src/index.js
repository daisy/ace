'use strict';

const builders = require('./report-builders');
const Report = require('./report');
const { localizer } = require('./l10n/localize');

module.exports = {
  builders,
  Report,
  localizer,
};
