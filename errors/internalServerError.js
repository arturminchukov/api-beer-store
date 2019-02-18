const ExtendableError = require('./extendableError');

class InternalServerError extends ExtendableError {
    constructor(message, initError) {
        super(message, initError, 500);
    }
}

module.exports = InternalServerError;
