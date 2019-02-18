const ExtendableError = require('./extendableError');

class FailedDependencyError extends ExtendableError {
    constructor(message, initError) {
        super(message, initError, 424);
    }
}

module.exports = FailedDependencyError;
