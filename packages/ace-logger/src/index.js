'use strict';

const { config, paths } = require('@daisy/ace-config');
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
const defaults = require('./defaults');

const logConfig  = config.get('logging', defaults.logging);

module.exports.initLogger = function initLogger(options = {}) {
  // Check logging directoy exists
  if (!fs.existsSync(paths.log)) {
    fs.ensureDirSync(paths.log);
  }

  // OS-dependant path to log file
  const logfile = path.join(paths.log, logConfig.fileName);

  // clear old log file
  if (fs.existsSync(logfile)) {
    fs.removeSync(logfile);
  }

  // set up logger
  const level = (options.verbose) ? 'verbose' : logConfig.level;
  winston.configure({
    level,
    transports: [
      new winston.transports.File({ name: 'file', filename: logfile }),
      new winston.transports.Console({ name: 'console' }),
    ],
  });
  if (options.silent) {
    winston.remove('console');
  }
  winston.cli();
};

/* eslint-disable no-underscore-dangle */
// Properly wait that loggers write to file before exitting
// See https://github.com/winstonjs/winston/issues/228
winston.logAndExit = function logAndExit(level, msg, codeOrCallback) {
  const self = this;
  this.log(level, msg, () => {
    let numFlushes = 0;
    let numFlushed = 0;
    Object.keys(self.default.transports).forEach((k) => {
      if (self.default.transports[k]._stream) {
        numFlushes += 1;
        self.default.transports[k]._stream.once('finish', () => {
          numFlushed += 1;
          if (numFlushes === numFlushed) {
            if (typeof codeOrCallback === 'function') {
              codeOrCallback();
            } else {
              process.exit(codeOrCallback);
            }
          }
        });
        self.default.transports[k]._stream.end();
      }
    });
    if (numFlushes === 0) {
      if (typeof codeOrCallback === 'function') {
        codeOrCallback();
      } else {
        process.exit(codeOrCallback);
      }
    }
  });
};
/* eslint-enable no-underscore-dangle */

