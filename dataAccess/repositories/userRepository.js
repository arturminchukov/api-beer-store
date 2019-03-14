const sequelizeInstance = require('../getSequelize');
const {userModel} = require('../models');
const {mapper} = require('../../helpers');
const {SQL_ERRORS} = require('../constants');
const {MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE, MAP_USER_DATABASE_PROPERTIES_TO_APPLICATION} = require('../mappers');
const {NotFoundError, UnprocessableEntityError, InternalServerError} = require('../../errors');
const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
    constructor(sequelize) {
        super(sequelize, userModel.name);
    }

    async getUserEntity(searchCriteria) {
        const user = await this.getUser(searchCriteria);

        return mapper(user.dataValues, MAP_USER_DATABASE_PROPERTIES_TO_APPLICATION);
    }

    getUserById(id, transaction) {
        if (!id) {
            throw new InternalServerError('User id is undefined');
        }

        return this.getUser({id}, transaction);
    }

    async getUser(searchCriteria, transaction) {
        const mappedSearchCriteria = mapper(searchCriteria, MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE);
        let user = null;

        try {
            user = await this.model.findOne({
                where: mappedSearchCriteria,
                transaction
            });
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }

        if (!user) {
            throw new NotFoundError('The user was not found');
        }

        return user;
    }

    async createUser(user) {
        const userProperties = mapper(user, MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE);

        try {
            const createdUser = await this.model.create(userProperties);

            return createdUser;
        } catch (error) {
            this._baseErrorHandler(error);

            if (error.name === SQL_ERRORS.SequelizeUniqueConstraintError) {
                throw new UnprocessableEntityError('Such email already exist', error);
            }

            throw error;
        }
    }
}

module.exports = new UserRepository(sequelizeInstance);
