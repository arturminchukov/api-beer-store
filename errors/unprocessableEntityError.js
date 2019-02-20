const ExtendableError = require('./extendableError');

class UnprocessableEntityError extends ExtendableError {
    constructor(message, initError) {
        super(message, initError, 422);
    }
}

module.exports = UnprocessableEntityError;
