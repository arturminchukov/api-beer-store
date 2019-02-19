const NotFoundError = require('./notFoundError');
const InternalServerError = require('./internalServerError');
const FailedDependencyError = require('./failedDependecyError');
const BadRequestError = require('./badRequestError');

module.exports = {
    NotFoundError,
    InternalServerError,
    FailedDependencyError,
    BadRequestError
};
