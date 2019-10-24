'use strict';

const { config, paths } = require('@daisy/ace-config');
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');
const uuid = require('uuid');

const defaults = require('./defaults');

const logConfig  = config.get('logging', defaults.logging);

const disableWinstonFileTransport = false; // (typeof process.env.JEST_TESTS !== "undefined") && process.platform === "win32";

// https://github.com/winstonjs/winston/blob/3.2.1/lib/winston/transports/file.js
const closeTransportAndWaitForFinish = async (transport) => {
  if (!transport.close || // e.g. transport.name === 'console'
    disableWinstonFileTransport) {
    return Promise.resolve();
  }
  // e.g. transport.name === 'file'
  
  return new Promise((resolve, reject) => {
    transport._doneFinish = false;
    function done(wasTimeout) {
      if (transport._doneFinish) {
        return;
      }
      transport._doneFinish = true;
      if (!wasTimeout && transport._doneTimeoutID) {
        clearTimeout(transport._doneTimeoutID);
      }
      resolve();
    }
    transport._doneTimeoutID = setTimeout(() => {
      console.log("WINSTON TIMEOUT");
      done(true);
    }, 5000);

    if (transport._stream) {
      // https://github.com/winstonjs/winston/blob/49ccdb6604ecce590eda2915b130970ee0f1b6a3/lib/winston/transports/file.js#L96
      transport._stream.once('finish', done); // emitted too early!
      setImmediate(() => {
        transport._stream.end(); // https://github.com/nodejs/readable-stream/blob/4ba93f84cf8812ca2af793c7304a5c16de72088a/lib/_stream_writable.js#L547
      });
    } else {
      transport.once('closed', done); // emitted too early! also 'flush', see https://github.com/winstonjs/winston/blob/49ccdb6604ecce590eda2915b130970ee0f1b6a3/lib/winston/transports/file.js#L457-L469
      transport.close();
    }
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

  const defaultLogger = winston.clear();

  const fileTransport = new winston.transports.File({ name: 'file', filename: logfile, silent: disableWinstonFileTransport });
  const consoleTransport = new winston.transports.Console({ name: 'console', stderrLevels: ['error'], silent: false });
  const transports = [
    fileTransport
  ];
  if (!options.silent) {
    transports.push(consoleTransport);
  }

  const level = (options.verbose) ? 'verbose' : logConfig.level;
  winston.configure({
    level,
    transports,
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.cli()
    )
  });

  // defaultLogger.on('error', () => { });
  // defaultLogger.emitErrs = false;

  // Properly wait that loggers write to file before exitting
  // See https://github.com/winstonjs/winston/issues/228
  winston.logAndWaitFinish = async (level, msg) => {
    return new Promise(async (resolve, reject) => {

      winston.log(level, msg
      //   , () => {
      //     resolve("LOG CALLBACK");
      // }
      );
      
      // defaultLogger.once("logged", () => {});

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
