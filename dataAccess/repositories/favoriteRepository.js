const {beerModel} = require('../models');
const {FailedDependencyError, UnprocessableEntityError, NotFoundError} = require('../../errors');
const {SQL_ERRORS} = require('../constants');
const sequelize = require('../getSequelize');

class FavoriteRepository {
    constructor(sequelizeInstance) {
        this.model = sequelizeInstance.models[beerModel.name];
    }

    async getFavoriteByForeignId(beerId) {
        let beer = null;

        try {
            beer = await this.model.findOne({
                where: {
                    foreign_id: beerId
                }
            });
        } catch (error) {
            if (error.name === SQL_ERRORS.SequelizeConnectionRefusedError) {
                throw new FailedDependencyError('Database connection refused', error);
            }

            if (error.name === SQL_ERRORS.SequelizeValidationError) {
                throw new UnprocessableEntityError(`Validation error: ${error.message}`, error);
            }
        }

        if (!beer) {
            throw new NotFoundError('The favorite beer was not found');
        }

        return beer;
    }

    async addFavorite(beer) {
        const {id, ...beerEntity} = beer;

        try {
            const favorite = await this.model.create({
                foreign_id: id,
                ...beerEntity
            });

            return favorite;
        } catch (error) {
            if (error.name === SQL_ERRORS.SequelizeConnectionRefusedError) {
                throw new FailedDependencyError('Database connection refused', error);
            }

            if (error.name === SQL_ERRORS.SequelizeUniqueConstraintError) {
                throw new UnprocessableEntityError('Such favorite id already exist', error);
            }

            if (error.name === SQL_ERRORS.SequelizeValidationError) {
                throw new UnprocessableEntityError(`Validation error: ${error.message}`, error);
            }
        }
    }
}

module.exports = new FavoriteRepository(sequelize);
