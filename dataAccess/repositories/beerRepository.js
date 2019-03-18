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
        this.beerAccessors = {
            count: 'countBeers',
            get: 'getBeers',
            add: 'addBeer',
            remove: 'removeBeer'
        };
    }

    async addBeer(beer, transaction) {
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

    async addFavoriteBeer(user, beerId) {
        const beer = await this.get(beerId);
        const beerPreviewInfo = mapper(beer, BEER_PREVIEW_INFO);

        const addedFavoriteBeer = await this._performTransaction(async (transaction) => {
            const favoriteBeer = await this.addBeer(beerPreviewInfo, transaction);

            return this._favoriteBeerOperation(user, this.beerAccessors.add, favoriteBeer, transaction);
        });


        if (addedFavoriteBeer.length < 1) {
            throw new NotFoundError('Such favorite beer already exist');
        }

        return addedFavoriteBeer;
    }

    async get(beerId) {
        const beers = await this._request(`/${this.entity}/${beerId}`);

        return beers[0];
    }

    async getBeerById(userId, id) {
        const {beers: favoriteBeers} = await this.getFavoriteBeers(userId);
        const beer = await this.get(id);

        this._markFavoriteFlag([beer], favoriteBeers);

        return beer;
    }

    async getFavoriteBeers(userId, paginationParams) {
        let databasePaginationParams = null;

        if (paginationParams) {
            databasePaginationParams = this._getdatabasePaginationParams(paginationParams);
        }

        const {count, rows} = await this.model.findAndCountAll({
            include: [{
                model: this.sequelize.models.user,
                where: {
                    id: userId
                },
                attributes: []
            }],
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
        } else {
            beers = await this._request(
                `/${this.entity}`,
                {
                    ...mappedPageParams,
                    ...mappedFilterParams
                }
            );

            const {beers: favoriteBeers} = await this.getFavoriteBeers(userId);

            this._markFavoriteFlag(beers, favoriteBeers);
        }


        return {
            pageNumber: paginationParams.pageNumber,
            pageSize: paginationParams.pageSize,
            items: beers || [],
            count
        };
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

    async removeFavoriteBeer(user, beerId) {
        const removedFavoriteBeer = await this._performTransaction(async (transaction) => {
            const favoriteBeer = await this.getBeerByExternalId(beerId, transaction);

            return this._favoriteBeerOperation(user, this.beerAccessors.remove, favoriteBeer, transaction);
        });

        if (removedFavoriteBeer < 1) {
            throw new NotFoundError('The favorite beer was not found');
        }

        return removedFavoriteBeer;
    }

    async _favoriteBeerOperation(user, operation, operationParams, transaction) {
        try {
            const result = await user[operation](operationParams, {
                transaction
            });

            return result;
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }
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
