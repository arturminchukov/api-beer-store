const NotFoundError = require('./notFoundError');
const InternalServerError = require('./internalServerError');
const FailedDependencyError = require('./failedDependecyError');
const UnprocessableEntityError = require('./unprocessableEntityError');
const UnauthorizedError = require('./unauthorizedError');

module.exports = {
    NotFoundError,
    InternalServerError,
    FailedDependencyError,
    UnprocessableEntityError,
    UnauthorizedError
};
