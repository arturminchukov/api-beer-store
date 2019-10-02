const BaseRepository = require('./baseRepository');
const {beerTypeModel} = require('../models');
const sequelizeInstance = require('../getSequelize');
const {NotFoundError} = require('../../errors');

class BeerTypeRepository extends BaseRepository {
    constructor(sequelize) {
        super(sequelize, beerTypeModel.name);
        this.sortOrder = [['name', 'ASC']];
    }

    async addBeerType(beerType) {
        try {
            const addedBeerType = await this.model.create(beerType);

            return addedBeerType.dataValues;
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }
    }

    async getAllBeerTypes() {
        try {
            const {count, rows: beerTypes} = await this.model.findAndCountAll({
                order: this.sortOrder,
                raw: true
            });

            return {
                count,
                items: beerTypes || []
            };
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }
    }

    async getBeerTypeById(id) {
        let beerType = null;

        try {
            beerType = await this.model.findOne({
                where: {
                    id
                },
                raw: true
            });
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }

        if (!beerType) {
            throw new NotFoundError('Beer type with such id was not found');
        }

        return beerType;
    }
}

module.exports = new BeerTypeRepository(sequelizeInstance);
