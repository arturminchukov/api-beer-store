const sequelize = require('../getSequelize');
const {userModel} = require('../models');
const {mapper} = require('../../helpers');
const {SQL_ERRORS} = require('../constants');
const {MAP_APPLICATION_PROPERTIES_TO_DATABASE, MAP_DATABASE_PROPERTIES_TO_APPLICATION} = require('../mappers');
const {FailedDependencyError, NotFoundError, UnprocessableEntityError} = require('../../errors');

class UserRepository {
    constructor(sequelizeInstance) {
        this.model = sequelizeInstance.models[userModel.name];
    }

    async getUser(searchCriteria) {
        const mappedSearchCriteria = mapper(searchCriteria, MAP_APPLICATION_PROPERTIES_TO_DATABASE);
        let user = null;

        try {
            user = await this.model.findOne({
                where: mappedSearchCriteria,
                raw: true
            });
        } catch (error) {
            if (error.name === SQL_ERRORS.SequelizeConnectionRefusedError) {
                throw new FailedDependencyError('Database connection refused', error);
            }

            if (error.name === SQL_ERRORS.SequelizeValidationError) {
                throw new UnprocessableEntityError(`Validation error: ${error.message}`, error);
            }
        }

        if (!user) {
            throw new NotFoundError('The user was not found');
        }

        user = mapper(user, MAP_DATABASE_PROPERTIES_TO_APPLICATION);

        return user;
    }

    async createUser(user) {
        const userProperties = mapper(user, MAP_APPLICATION_PROPERTIES_TO_DATABASE);

        try {
            const createdUser = await this.model.create(userProperties);

            return createdUser;
        } catch (error) {
            if (error.name === SQL_ERRORS.SequelizeConnectionRefusedError) {
                throw new FailedDependencyError('Database connection refused', error);
            }

            if (error.name === SQL_ERRORS.SequelizeUniqueConstraintError) {
                throw new UnprocessableEntityError('Such email already exist', error);
            }

            if (error.name === SQL_ERRORS.SequelizeValidationError) {
                throw new UnprocessableEntityError(`Validation error: ${error.message}`, error);
            }
        }
    }
}

module.exports = new UserRepository(sequelize);
