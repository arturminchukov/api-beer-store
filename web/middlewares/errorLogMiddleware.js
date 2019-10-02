const {logger} = require('../../modules');

const errorLogMiddleware = function (error, req, res, next) {
    logger.error({
        statusCode: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        initError: error.initError,
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

module.exports = errorLogMiddleware;
