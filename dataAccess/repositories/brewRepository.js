const BaseRepository = require('./baseRepository');
const {brewModel} = require('../models');
const sequelizeInstance = require('../getSequelize');
const {NotFoundError} = require('../../errors');
const {MAP_BREW_APPLICATION_PROPERTIES_TO_DATABASE} = require('../mappers');
const {mapper} = require('../../helpers');

class BrewRepository extends BaseRepository {
    constructor(sequelize) {
        super(sequelize, brewModel.name);
    }

    async getBrews(paginationParams) {
        let databasePaginationParams = null;
        let brews = null;
        let count = null;

        if (paginationParams) {
            databasePaginationParams = this._getDatabasePaginationParams(paginationParams);
        }

        try {
            ({
                count,
                rows: brews
            } = await this.model.findAndCountAll({
                raw: true,
                include: {
                    model: this.sequelize.models.beerType
                },
                ...databasePaginationParams
            }));
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }

        brews = brews.map(brew => mapper(brew, MAP_BREW_APPLICATION_PROPERTIES_TO_DATABASE));

        return this._performPaginatedData(brews, count, paginationParams);
    }

    async getBrewById(id) {
        let brew = null;

        try {
            brew = await this.model.findOne({
                where: {
                    id
                },
                include: {
                    model: this.sequelize.models.beerType
                },
                raw: true
            });
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }

        if (!brew) {
            throw new NotFoundError('Cannot find brew with such id');
        }

        brew = mapper(brew, MAP_BREW_APPLICATION_PROPERTIES_TO_DATABASE);

        return brew;
    }

    async addBrew(brew) {
        try {
            const createdBrew = await this.model.create(brew);

            return createdBrew.dataValues;
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }
    }
}

module.exports = new BrewRepository(sequelizeInstance);
