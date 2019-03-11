const sequelize = require('../getSequelize');
const {userModel} = require('../models');
const {mapper} = require('../../helpers');
const {SQL_ERRORS} = require('../constants');
const {MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE, MAP_USER_DATABASE_PROPERTIES_TO_APPLICATION} = require('../mappers');
const {NotFoundError, UnprocessableEntityError} = require('../../errors');
const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
    constructor(sequelizeInstance) {
        super(sequelizeInstance.models[userModel.name]);

        this.beerAccessors = this.model.associations.beers.accessors;
    }

    async getUserEntity(searchCriteria) {
        const user = await this.getUser(searchCriteria);

        return mapper(user.dataValues, MAP_USER_DATABASE_PROPERTIES_TO_APPLICATION);
    }

    async getUser(searchCriteria, transaction) {
        const mappedSearchCriteria = mapper(searchCriteria, MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE);
        const user = await this._sequelizeErrorHandler(this.model.findOne, this.model, {
            where: mappedSearchCriteria,
            transaction
        });


        if (!user) {
            throw new NotFoundError('The user was not found');
        }

        return user;
    }

    async createUser(user) {
        const userProperties = mapper(user, MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE);

        try {
            const createdUser = await this._sequelizeErrorHandler(this.model.create, this.model, userProperties);

            return createdUser;
        } catch (error) {
            if (error.name === SQL_ERRORS.SequelizeUniqueConstraintError) {
                throw new UnprocessableEntityError('Such email already exist', error);
            }

            throw error;
        }
    }

    addFavoriteBeer(userId, favoriteBeer, transaction) {
        return this._favoriteBeerOperation(userId, favoriteBeer, this.beerAccessors.add, transaction);
    }

    removeFavoriteBeer(userId, favoriteBeer, transaction) {
        return this._favoriteBeerOperation(userId, favoriteBeer, this.beerAccessors.remove, transaction);
    }

    async _favoriteBeerOperation(userId, favoriteBeer, operation, transaction) {
        const user = await this.getUser({id: userId}, transaction);

        return this._sequelizeErrorHandler(user[operation], user, favoriteBeer, {transaction});
    }
}

module.exports = new UserRepository(sequelize);
