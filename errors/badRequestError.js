const ExtendableError = require('./extendableError');

class badRequestError extends ExtendableError {
    constructor(message, initError) {
        super(message, initError, 400);
    }
}

module.exports = badRequestError;
