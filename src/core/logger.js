const winston = require('winston');
const fs = require('fs-extra');
const LOGFILE = __dirname + "/../ace.log";

module.exports = {
  initLogger: function(options) {
    // clear old log file
    fs.removeSync(LOGFILE);

    // set up logger
    var level = 'info';
    if (options.verbose) {
      level = 'verbose';
    }
    winston.configure({
      level: level,
      transports: [
        new (winston.transports.File)({name: "file", filename: LOGFILE}),
        new (winston.transports.Console)({name: "console"})
      ]
    });
    if (options.silent) {
        winston.remove("console");
    }
    winston.cli();
  }
}
