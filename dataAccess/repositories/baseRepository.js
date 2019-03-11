const {FailedDependencyError, UnprocessableEntityError} = require('../../errors');
const {SQL_ERRORS} = require('../constants');

class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async _sequelizeErrorHandler(callback, context, ...args) {
        try {
            const result = await Reflect.apply(callback, context, args);

            return result;
        } catch (error) {
            if (error.name === SQL_ERRORS.SequelizeConnectionRefusedError) {
                throw new FailedDependencyError('Database connection refused', error);
            }

            if (error.name === SQL_ERRORS.SequelizeValidationError) {
                throw new UnprocessableEntityError(`Validation error: ${error.message}`, error);
            }

            throw error;
        }
    }
}

module.exports = BaseRepository;
