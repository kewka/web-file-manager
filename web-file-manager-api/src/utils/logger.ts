import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'logs/server.log' }
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'debug' }
    }
});

const logger = log4js.getLogger();

console.log = logger.info.bind(logger);
console.error = logger.error.bind(logger);
console.debug = logger.debug.bind(logger);

export default logger;
