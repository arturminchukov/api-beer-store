const ExtendableError = require('./extendableError');

class NotFoundError extends ExtendableError {
    constructor(message, initError) {
        super(message, initError, 404);
    }
}

module.exports = NotFoundError;
