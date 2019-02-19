require('winston-daily-rotate-file');
const winston = require('winston');
const config = require('config');

const DEFAULT_LOGGER_LEVEL = config.get('LOGGER.DEFAULT_LEVEL');
const MAX_TIME_FILES_STORE = config.get('LOGGER.MAX_TIME_FILES_STORE');
const DEBUG = config.get('DEBUG');

class Logger {
    constructor() {
        const transports = [new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf(info => `${info.timestamp} [${info.level}]: ${JSON.stringify(info)}`)
            )
        })];

        if (DEBUG) {
            transports.push(new winston.transports.DailyRotateFile({
                filename: 'log-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: MAX_TIME_FILES_STORE,
                dirname: 'logs'
            }));
        }

        const logger = winston.createLogger({
            level: DEFAULT_LOGGER_LEVEL,
            format: winston.format.json(),
            transports
        });

        this.stream = {
            write(message) {
                logger.info(message);
            }
        };

        this.logger = logger;
    }

    error(...args) {
        this.logger.error(...args);
    }

    info(...args) {
        this.logger.info(...args);
    }
}

module.exports = new Logger();
