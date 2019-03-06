const config = require('config');

const DEBUG = config.get('DEBUG');

const errorHandleMiddleware = function (error, req, res, next) {
    const answer = {
        statusCode: error.statusCode,
        message: error.message
    };

    if (DEBUG) {
        answer.stackTrace = error.stack;
        answer.initError = error.initError;
    }

    res.status(error.statusCode);
    res.send(answer);
};

module.exports = errorHandleMiddleware;
