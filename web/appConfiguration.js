const config = require('config');

require('winston-daily-rotate-file');
const bodyParser = require('body-parser');
const cors = require('cors');
const {beerRouter, userRouter} = require('./routers');
const {logger} = require('../modules');
const morgan = require('morgan');

const DEBUG = config.get('DEBUG');

const errorLogMiddleware = function (error, req, res, next) {
    let initError = null;
    debugger;
    if (error.getInitErrorInfo) {
        initError = error.getInitErrorInfo();
    }

    logger.error({
        statusCode: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        initError,
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

const errorHandleMiddleware = function (error, req, res, next) {
    res.status(error.statusCode);
    if (DEBUG) {
        let initError = null;

        if (error.getInitErrorInfo) {
            initError = error.getInitErrorInfo();
        }

        res.send({
            statusCode: error.statusCode,
            message: error.message,
            stackTrace: error.stack,
            initError
        });
    } else {
        res.send({
            message: error.message,
            statusCode: error.statusCode
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
    app.use('/beers', beerRouter);
    app.use('/users', userRouter);
};

const configureErrorLogger = function (app) {
    app.use(errorLogMiddleware);
};

const configureErrorHandlers = function (app) {
    app.use(errorHandleMiddleware);
};


module.exports = {
    configureParsers,
    configureHeader,
    configureLogger,
    configureRoutes,
    configureErrorLogger,
    configureErrorHandlers
};
