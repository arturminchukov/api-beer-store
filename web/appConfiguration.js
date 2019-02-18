const config = require('config');

require('winston-daily-rotate-file');
const bodyParser = require('body-parser');
const cors = require('cors');
const {beersRouter} = require('./routers');
const {winstonLogger} = require('../modules').logger;
const winston = require('winston');
const morgan = require('morgan');

const DEBUG = config.get('DEBUG');

const transports = [new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${JSON.stringify(info)}`)
    )
})];

if (!DEBUG) {
    transports.push(new winston.transports.DailyRotateFile({
        filename: 'log-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '60d',
        dirname: 'logs'
    }));
}

const logger = winstonLogger(transports);

const errorLogger = function (error, req, res, next) {
    logger.error({
        statusCode: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        initError: error.getInitErrorInfo(),
        request: {
            query: req.query || null,
            params: req.params || null,
            path: req.path,
            method: req.method,
            originalUrl: req.originalUrl
        }
    });
    next(error);
};

const errorHandler = function (error, req, res, next) {
    res.status(error.statusCode);
    if (DEBUG) {
        res.send({
            statusCode: error.statusCode,
            message: error.message,
            stackTrace: error.stack,
            initError: error.getInitErrorInfo(),
            request: {
                query: req.query || null,
                params: req.params || null,
                path: req.path,
                method: req.method,
                originalUrl: req.originalUrl
            }
        });
    } else {
        res.send({
            message: error.message,
            statusCode: error.statusCode,
            request: {
                query: req.query || null,
                params: req.params || null,
                path: req.path,
                method: req.method,
                originalUrl: req.originalUrl
            }
        });
    }
};

const configureParsers = function (app) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
};

const configureHeader = function (app) {
    app.use(cors());
};

const configureLogger = function (app) {
    app.use(morgan('combined', {stream: logger.stream}));
};

const configureRoutes = function (app) {
    app.use('/beers', beersRouter);
};

const configureErrorLogger = function (app) {
    app.use(errorLogger);
};

const configureErrorHandlers = function (app) {
    app.use(errorHandler);
};


module.exports = {
    configureParsers,
    configureHeader,
    configureLogger,
    configureRoutes,
    configureErrorLogger,
    configureErrorHandlers
};
