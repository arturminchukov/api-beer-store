require('winston-daily-rotate-file');
const winston = require('winston');

const winstonLogger = function (transports) {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports
    });

    logger.stream = {
        write(message) {
            logger.info(message);
        }
    };

    return logger;
};

module.exports = {
    winstonLogger
};
