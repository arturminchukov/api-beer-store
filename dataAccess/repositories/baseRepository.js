const {FailedDependencyError, UnprocessableEntityError} = require('../../errors');
const {SQL_ERRORS} = require('../constants');

class BaseRepository {
    constructor(sequelize, modelName) {
        this.model = sequelize.models[modelName];
        this.sequelize = sequelize;
    }

    _baseErrorHandler(error) {
        if (error.name === SQL_ERRORS.SequelizeConnectionRefusedError) {
            throw new FailedDependencyError('Database connection refused', error);
        }

        if (error.name === SQL_ERRORS.SequelizeValidationError) {
            throw new UnprocessableEntityError(`Validation error: ${error.message}`, error);
        }

        if (error.name === SQL_ERRORS.SequelizeUniqueConstraintError) {
            throw new UnprocessableEntityError(`Validation error: ${error.name}`, error);
        }
    }

    _performTransaction(callback) {
        const bindedCallback = callback.bind(this);

        return this.sequelize.transaction(bindedCallback);
    }

    _getdatabasePaginationParams(paginationParams) {
        return {
            limit: paginationParams.pageSize,
            offset: (paginationParams.pageNumber - 1) * paginationParams.pageSize,
            order: [[paginationParams.sortBy, paginationParams.sortByDirection.toUpperCase()]]
        };
    }
}

module.exports = BaseRepository;
