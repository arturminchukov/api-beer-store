const config = require('config');
const axios = require('axios');

const {NotFoundError, InternalServerError, FailedDependencyError} = require('../../errors');
const {MAP_FILTER_PARAMS, MAP_PAGE_PARAMS} = require('../constants');

const API_URL = config.get('EXTERNAL_RESOURCES.API_URL');

class BeerRepository {
    constructor() {
        this.client = axios.create({
            baseURL: API_URL,
            method: 'get'
        });
        this.entity = 'beers';
    }

    async getAll(paginationParams, filterParams) {
        const mappedPageParams = this._mapParams(paginationParams, MAP_PAGE_PARAMS);
        const mappedFilterParams = this._mapParams(filterParams, MAP_FILTER_PARAMS);

        const beers = await this._request(
            `/${this.entity}`,
            {
                ...mappedPageParams,
                ...mappedFilterParams
            }
        );

        return beers || [];
    }

    async get(beerId) {
        const beers = await this._request(`/${this.entity}/${beerId}`);

        return beers[0];
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

    _mapParams(params, mapper) {
        const newParams = {};
        const paramKeys = Object.keys(params);

        paramKeys.forEach((paramKey) => {
            newParams[mapper[paramKey]] = params[paramKey];
        });

        return newParams;
    }
}

module.exports = new BeerRepository();
