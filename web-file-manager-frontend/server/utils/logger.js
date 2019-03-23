const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'logs/server.log' }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' }
  }
});

// Get default logger
const logger = log4js.getLogger();

// Override default console methods
console.log = logger.info.bind(logger);
console.error = logger.error.bind(logger);
console.debug = logger.debug.bind(logger);
console.warn = logger.warn.bind(logger);

module.exports = logger;
