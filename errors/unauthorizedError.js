const ExtendableError = require('./extendableError');

class UnauthorizedError extends ExtendableError {
    constructor(message, initError) {
        super(message, initError, 401);
    }
}

module.exports = UnauthorizedError;
