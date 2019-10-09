'use strict';

const { config, paths } = require('@daisy/ace-config');
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
const uuid = require('uuid');

const defaults = require('./defaults');

const logConfig  = config.get('logging', defaults.logging);

const disableWinstonFileTransport = false; // (typeof process.env.JEST_TESTS !== "undefined") && process.platform === "win32";

const closeTransportAndWaitForFinish = async (transport) => {
  if (!transport.close || // e.g. transport.name === 'console'
    disableWinstonFileTransport) {
    return Promise.resolve();
  }
  // e.g. transport.name === 'file'
  
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

    // if (transport._stream) {
    //   transport._stream.once('finish', finished);
    //   // transport._stream.end();
    //   transport.close();
    // }

    transport.once('finish', finished);
    transport.close();
  });
}

module.exports.initLogger = function initLogger(options = {}) {

  const dateNow = new Date();
  const msfromPosixEpochUntilNow = dateNow.getTime();
  const dateNowFormatted = dateNow.toISOString().replace(/:/g, "-").replace(/\./g, "-");

  if (!disableWinstonFileTransport) {

    if (!fs.existsSync(paths.log)) {
      try {
        fs.ensureDirSync(paths.log);
      } catch (err) {
        // ignore (other process won the dir creation race?)
      }
    } else {
      try {
        const msPer_second = 1000 * 1;
        const msPer_minute = msPer_second * 60;
        // const msPer_hour = msPer_minute * 60;
        // const msPer_day = msPer_hour * 24;
        // const msPer_year = msPer_day * 365;

        const msMax = (options.maxMinutes || defaults.logging.maxMinutes) * msPer_minute; // log files older than x minutes are deleted

        const dirContents = fs.readdirSync(paths.log);
        dirContents.forEach((dirEntry) => {
          const dirEntryPath = path.join(paths.log, dirEntry);
          const stats = fs.statSync(dirEntryPath);
          if (stats.isFile()) {
            const msDiff = msfromPosixEpochUntilNow - stats.mtimeMs; // stats.mtime.getTime()
            const doRemove = msDiff > msMax;
            if (doRemove) {
              // fs.removeSync(dirEntryPath);
              fs.unlink(dirEntryPath, (_err) => {
                // ignore (file busy / already open with read or write access?)
              });
            }
          }
        });
      } catch (err) {
        // ignore
      }
    }
  }

  let logConfigFileName = options.fileName || logConfig.fileName;
  let logfile = path.join(paths.log, logConfigFileName);
  if (!disableWinstonFileTransport) {
    do {
      let uniqueID = uuid.v4();
      const ext = path.extname(logConfigFileName);
      const baseName = path.basename(logConfigFileName, ext && ext.length ? ext : undefined);
      logfile = path.join(paths.log, `${baseName}_${dateNowFormatted}_${uniqueID}${ext}`);
    } while (fs.existsSync(logfile));
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
