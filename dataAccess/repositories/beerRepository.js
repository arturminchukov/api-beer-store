const config = require('config');
const axios = require('axios');

const {NotFoundError, InternalServerError, FailedDependencyError} = require('../../errors');
const BaseRepository = require('./baseRepository');
const userRepository = require('./userRepository');
const {MAP_FILTER_PARAMS, MAP_PAGE_PARAMS, MAP_BEER_APPLICATION_PROPERTIES_TO_DATABASE} = require('../mappers');
const {mapper} = require('../../helpers');
const {beerModel} = require('../models');
const sequelize = require('../getSequelize');

const API_URL = config.get('EXTERNAL_RESOURCES.API_URL');

class BeerRepository extends BaseRepository {
    constructor(sequelizeInstance) {
        super(sequelizeInstance.models[beerModel.name]);

        this.client = axios.create({
            baseURL: API_URL,
            method: 'get'
        });
        this.entity = 'beers';
    }

    async getAll(paginationParams, filterParams, userId) {
        const mappedPageParams = mapper(paginationParams, MAP_PAGE_PARAMS);
        const mappedFilterParams = mapper(filterParams, MAP_FILTER_PARAMS);

        const beers = await this._request(
            `/${this.entity}`,
            {
                ...mappedPageParams,
                ...mappedFilterParams
            }
        );

        const favoriteBeers = await userRepository.getFavoriteBeers(userId);
        const favoriteBeerIds = favoriteBeers.map(favoriteBeer => favoriteBeer.id);

        beers.forEach((beer) => {
            if (favoriteBeerIds.includes(beer.id)) {
                beer.isFavorite = true;
            }
        });

        return beers || [];
    }

    async get(beerId) {
        const beers = await this._request(`/${this.entity}/${beerId}`);

        return beers[0];
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

module.exports = new BeerRepository(sequelize);
