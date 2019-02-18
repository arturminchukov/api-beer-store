const config = require('config');

const axios = require('axios');
const {NotFoundError, InternalServerError, FailedDependecyError} = require('../../errors');
const {MAP_FILTER_PARAMS, MAP_PAGE_PARAMS} = require('../../constants').dataAccess;

const API_URL = config.get('EXTERNAL_RESOURCES.API_URL');

class BeerRepository {
    constructor() {
        this.apiInstance = axios.create({
            baseURL: API_URL,
            method: 'get'
        });
        this.entity = 'beers';
    }

    async _request(url, params) {
        let result = null;

        try {
            result = await this.apiInstance.request({
                url,
                params
            });
        } catch (error) {
            const errorStatusCode = error.response && error.response.data && error.response.data.statusCode;
            let resultError = null;

            if (errorStatusCode >= 500) {
                resultError = new FailedDependecyError('Punkapi server not response', error);
            } else if (errorStatusCode === 404) {
                resultError = new NotFoundError('Beer was not found', error);
            } else {
                resultError = new InternalServerError('Server cannot load beer information', error);
            }

            throw resultError;
        }

        return result.data;
    }

    _mapParams(params, mapper) {
        const newParams = {};
        const paramKeys = Object.keys(params);

        paramKeys.forEach((paramKey) => {
            newParams[mapper[paramKey]] = params[paramKey];
        });

        return newParams;
    }

    async getAll(pageParams, filterParams) {
        const mappedPageParams = this._mapParams(pageParams, MAP_PAGE_PARAMS);
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

    async get(id) {
        const beers = await this._request(`/${this.entity}/${id}`);

        return beers[0];
    }
}

module.exports = new BeerRepository();
