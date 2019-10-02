class ExtendableError extends Error {
    constructor(message, initError, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.initError = initError;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExtendableError;
