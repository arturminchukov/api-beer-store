const sequelize = require('../getSequelize');
const {userModel} = require('../models');
const {mapper} = require('../../helpers');
const {SQL_ERRORS} = require('../constants');
const {MAP_APPLICATION_PROPERTIES_TO_DATABASE, MAP_DATABASE_PROPERTIES_TO_APPLICATION} = require('../mappers');
const {FailedDependencyError, InternalServerError, NotFoundError, UnprocessableEntityError} = require('../../errors');

class UserRepository {
    constructor(model) {
        this.model = model;
    }

    /*TODO: refactor it for login route*/
    async getUser(options) {
        const validOptions = mapper(options, MAP_APPLICATION_PROPERTIES_TO_DATABASE);
        let result = null;

        try {
            result = await this.model.findOne({
                where: validOptions,
                attributes: ['id', 'email', 'first_name', 'last_name', 'birthday', 'image_url']
            });
        } catch (error) {
            if (error.statusCode >= 500) {
                throw new FailedDependencyError('Database not response', error);
            } else if (error.statusCode === 404) {
                throw new NotFoundError('The user was not found', error);
            } else {
                console.log(error);
                throw new InternalServerError('Error in connection to database', error);
            }
        }

        if (!result) {
            throw new NotFoundError('The user was not found');
        }

        result = mapper(result.dataValues, MAP_DATABASE_PROPERTIES_TO_APPLICATION);

        return result;
    }

    async createUser(user) {
        const userProperties = mapper(user, MAP_APPLICATION_PROPERTIES_TO_DATABASE);

        try {
            const result = await this.model.create(userProperties);

            return result;
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

module.exports = new UserRepository(sequelize.models[userModel.name]);
