require('winston-daily-rotate-file');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {beerRouter, userRouter} = require('./routers');
const {logger} = require('../modules');
const {errorHandleMiddleware, errorLogMiddleware} = require('./middlewares');

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
