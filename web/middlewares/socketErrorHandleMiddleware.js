const config = require('config');

const DEBUG = config.get('DEBUG');

const socketErrorHandleMiddleware = function (socket, data, response, error) {
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

    socket.emit('other', responseError);
};

module.exports = socketErrorHandleMiddleware;
