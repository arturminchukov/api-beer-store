const ExtendableError = require('./extendableError');

class NoBeerResultError extends ExtendableError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = NoBeerResultError;
