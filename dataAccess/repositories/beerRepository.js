const config = require('config');
const axios = require('axios');

const {NotFoundError, InternalServerError, FailedDependencyError} = require('../../errors');
const BaseRepository = require('./baseRepository');
const {MAP_FILTER_PARAMS, MAP_PAGE_PARAMS, MAP_BEER_APPLICATION_PROPERTIES_TO_DATABASE, MAP_BEER_DATABASE_PROPERTIES_TO_APLLICATION} = require('../mappers');
const {mapper} = require('../../helpers');
const {beerModel} = require('../models');
const sequelizeInstance = require('../getSequelize');
const {BEER_PREVIEW_INFO} = require('../constants');

const API_URL = config.get('EXTERNAL_RESOURCES.API_URL');

class BeerRepository extends BaseRepository {
    constructor(sequelize) {
        super(sequelize, beerModel.name);

        this.client = axios.create({
            baseURL: API_URL,
            method: 'get'
        });
        this.entity = 'beers';
    }

    async addOrUpdateBeer(beer, transaction) {
        const mappedBeer = mapper(beer, MAP_BEER_APPLICATION_PROPERTIES_TO_DATABASE);
        let addedBeer = null;

        try {
            addedBeer = await this.model.upsert(mappedBeer, {
                transaction,
                returning: true
            });
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }

        return addedBeer[0];
    }

    async addFavoriteBeer(userId, beerId) {
        const beer = await this.get(beerId);
        const beerPreviewInfo = mapper(beer, BEER_PREVIEW_INFO);

        return this._performTransaction(async (transaction) => {
            const favoriteBeer = await this.addOrUpdateBeer(beerPreviewInfo, transaction);

            try {
                await favoriteBeer.addUser(userId, {transaction});
            } catch (error) {
                this._baseErrorHandler(error);

                throw error;
            }
        });
    }

    async get(beerId) {
        const beers = await this._request(`/${this.entity}/${beerId}`);

        return beers[0];
    }

    async getBeerById(userId, beerId) {
        const result = await Promise.all([
            await this.getFavoriteBeers(userId, null, {external_id: beerId}),
            await this.get(beerId)
        ]);

        const [{beers: favoriteBeers}, beer] = result;

        this._markFavoriteFlag([beer], favoriteBeers);

        return beer;
    }

    async getFavoriteBeers(userId, paginationParams, searchCriteria) {
        let databasePaginationParams = null;

        if (paginationParams) {
            databasePaginationParams = this._getDatabasePaginationParams(paginationParams);
        }

        const {count, rows} = await this.model.findAndCountAll({
            include: [{
                model: this.sequelize.models.user,
                where: {
                    id: userId
                },
                attributes: []
            }],
            where: searchCriteria,
            attributes: {
                exclude: ['id']
            },
            raw: true,
            ...databasePaginationParams
        });

        const beers = rows.map(beer => mapper(beer, MAP_BEER_DATABASE_PROPERTIES_TO_APLLICATION));

        return {
            count,
            beers
        };
    }

    async getAll(userId, paginationParams, filterParams) {
        const mappedPageParams = mapper(paginationParams, MAP_PAGE_PARAMS);
        const mappedFilterParams = mapper(filterParams, MAP_FILTER_PARAMS);
        let beers = null;
        let count = null;

        if (filterParams.isFavorite) {
            ({
                beers,
                count
            } = await this.getFavoriteBeers(userId, paginationParams));

            beers.forEach((beer) => {
                beer.isFavorite = true;
            });
        } else {
            beers = await this._request(
                `/${this.entity}`,
                {
                    ...mappedPageParams,
                    ...mappedFilterParams
                }
            );

            const beerIds = beers.map(beer => beer.id);
            const {beers: favoriteBeers} = await this.getFavoriteBeers(userId, null, {external_id: beerIds});

            this._markFavoriteFlag(beers, favoriteBeers);
        }

        return this._paginateData(beers, count, paginationParams);
    }

    async getBeerByExternalId(externalId, transaction) {
        let beer = null;

        try {
            beer = await this.model.findOne({
                where: {
                    external_id: externalId
                },
                transaction
            });
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }

        if (!beer) {
            throw new NotFoundError('The favorite beer was not found');
        }

        return beer;
    }

    removeFavoriteBeer(userId, beerId) {
        return this._performTransaction(async (transaction) => {
            try {
                const favoriteBeer = await this.getBeerByExternalId(beerId, transaction);

                await favoriteBeer.removeUser(userId, {transaction});
            } catch (error) {
                this._baseErrorHandler(error);

                if (error instanceof NotFoundError) {
                    return;
                }

                throw error;
            }
        });
    }

    _markFavoriteFlag(beers, favoriteBeers) {
        const favoriteBeerIds = favoriteBeers.map(favoriteBeer => favoriteBeer.id);

        beers.forEach((beer) => {
            if (favoriteBeerIds.includes(beer.id)) {
                beer.isFavorite = true;
            }
        });
    }

    async _request(url, params) {
        try {
            const result = await this.client.request({
                url,
                params
            });

            return result.data;
        } catch (error) {
            const errorStatusCode = error.response && error.response.data && error.response.data.statusCode;
            let resultError = null;

            if (errorStatusCode >= 500) {
                resultError = new FailedDependencyError('Punkapi server not response', error);
            } else if (errorStatusCode === 404) {
                resultError = new NotFoundError('Beer was not found', error);
            } else {
                resultError = new InternalServerError('Server cannot load beer information', error);
            }

            throw resultError;
        }
    }
}

module.exports = new BeerRepository(sequelizeInstance);
