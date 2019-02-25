class ExtendableError extends Error {
    constructor(message, initError, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.initError = initError;

        Error.captureStackTrace(this, this.constructor);
    }

    getInitErrorInfo() {
        debugger;
        if (!this.initError) {
            return null;
        }

        if (this.initError instanceof Array) {
            return this.initError.map(error => `${error.keyword} ${error.dataPath} ${error.message}`);
        }

        return {
            statusCode: this.initError.statusCode,
            message: this.initError.message,
            stack: this.initError.stack
        };
    }
}

module.exports = ExtendableError;
