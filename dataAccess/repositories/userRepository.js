const sequelizeInstance = require('../getSequelize');
const {userModel} = require('../models');
const {SQL_ERRORS} = require('../constants');
const {NotFoundError, UnprocessableEntityError} = require('../../errors');
const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
    constructor(sequelize) {
        super(sequelize, userModel.name);
    }

    async getUserEntity(searchCriteria) {
        const user = await this.getUser(searchCriteria);

        return user.dataValues;
    }

    async getUser(searchCriteria, transaction) {
        let user = null;

        try {
            user = await this.model.findOne({
                where: searchCriteria,
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
        try {
            const createdUser = await this.model.create(user);

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
