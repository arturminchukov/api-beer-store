const config = require('config');

const DEBUG = config.get('DEBUG');

class ErrorController {
    logError(error, req, res, next) {
        if (DEBUG) {
            console.error(error.stack);
        } else {
            console.log(error.message, error.statusCode);
        }

        next(error);
    }

    errorHandler(error, req, res, next) {
        res.status(error.statusCode || 500);
        res.send({
            status: error.statusCode || 500,
            message: error.message
        });
    }
}

module.exports = new ErrorController();
