const config = require('config');

const DEBUG = config.get('DEBUG');

const errorHandleMiddleware = function (error, req, res, next) {
    const responseError = {
        statusCode: error.statusCode,
        message: error.message
    };

    if (DEBUG) {
        if (error.statusCode >= 500) {
            responseError.stackTrace = error.stack;
        }

        responseError.initError = error.initError;
    }

    res.status(error.statusCode);
    res.send(responseError);
};

module.exports = errorHandleMiddleware;
