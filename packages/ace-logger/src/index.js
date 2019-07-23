'use strict';

const { config, paths } = require('@daisy/ace-config');
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
const defaults = require('./defaults');

const logConfig  = config.get('logging', defaults.logging);

const closeTransportAndWaitForFinish = async (transport) => {
  if (!transport.close) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    transport._doneFinish = false;
    function done() {
      if (transport._doneFinish) {
        return;
      }
      transport._doneFinish = true;
      resolve();
    }
    setTimeout(() => {
      done();
    }, 5000);
    const finished = () => {
      done();
    };
    if (transport._stream) {
      transport._stream.once('finish', finished);
      transport._stream.end();
    } else {
      transport.once('finish', finished);
      transport.close();
    }
  });
}

module.exports.initLogger = function initLogger(options = {}) {

  const disableWinstonFileTransport = (typeof process.env.JEST_TESTS !== "undefined") && process.platform === "win32";

  // Check logging directoy exists
  if (!disableWinstonFileTransport && !fs.existsSync(paths.log)) {
    fs.ensureDirSync(paths.log);
  }

  // OS-dependant path to log file
  const logfile = path.join(paths.log, logConfig.fileName);

  // clear old log file
  if (!disableWinstonFileTransport && fs.existsSync(logfile)) {
    fs.removeSync(logfile);
  }

  const fileTransport = new winston.transports.File({ name: 'file', filename: logfile, silent: disableWinstonFileTransport });
  const consoleTransport = new winston.transports.Console({ name: 'console', stderrLevels: ['error'], silent: false });
  const transports = [
    fileTransport
  ];
  if (!options.silent) {
    transports.push(consoleTransport);
  }

  // set up logger
  const level = (options.verbose) ? 'verbose' : logConfig.level;
  winston.configure({
    level,
    transports,
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.cli()
    )
  });

  // winston.on('error', () => { });
  // winston.emitErrs = false;

  // Properly wait that loggers write to file before exitting
  // See https://github.com/winstonjs/winston/issues/228
  winston.logAndWaitFinish = async (level, msg) => {
    return new Promise(async (resolve, reject) => {
      winston.log(level, msg);

      for (const transport of transports) {
        try {
          await closeTransportAndWaitForFinish(transport);
        } catch (err) {
          console.log(err);
        }
      }
      resolve();
    });
  };
};
