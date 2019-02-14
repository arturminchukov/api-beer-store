const config = require('config');

const axios = require('axios');
const statuses = require('statuses');
const {NoBeerResultError} = require('../../errors');
const {MAP_PARAMS} = require('../../constants').beers;

const API_URL = config.get('EXTERNAL_RESOURCES.API_URL');

class BeerRepository {
    constructor() {
        this.apiInstance = axios.create({
            baseURL: API_URL,
            method: 'get'
        });
        this.entity = 'beers';
    }

    async request({url, params}) {
        const result = await this.apiInstance.request({
            url,
            params
        });

        return result.data;
    }

    mapParams(params, mapper) {
        const newParams = {};
        const paramKeys = Object.keys(params);

        paramKeys.forEach((paramKey) => {
            newParams[mapper[paramKey]] = params[paramKey];
        });

        return newParams;
    }

    async getAll(pageParams, filterParams) {
        const params = this.mapParams({
            ...pageParams,
            ...filterParams
        }, MAP_PARAMS);

        let beers = null;

        try {
            beers = await this.request({
                url: `/${this.entity}`,
                params
            });

        } catch (error) {
            const errorStatusCode = error && error.response && error.response.data && error.response.data.statusCode;
            let resultError = null;

            if (errorStatusCode >= 500) {
                const statusCode = 424;

                resultError = {
                    statusCode,
                    message: statuses.STATUS_CODES[statusCode]
                };
            } else {
                resultError = new NoBeerResultError('The specified parameters are not correct');
            }

            throw resultError;
        }

        return beers;
    }

    async get(id) {
        let beer = null;

        try {
            beer = await this.request({
                url: `/${this.entity}/${id}`
            });
        } catch (error) {
            const errorStatusCode = error && error.response && error.response.data && error.response.data.statusCode;
            let resultError = null;

            if (errorStatusCode >= 500) {
                const statusCode = 424;

                resultError = {
                    statusCode,
                    message: statuses.STATUS_CODES[statusCode]
                };
            } else {
                resultError = new NoBeerResultError(`Beer with id ${id} was not found`);
            }

            throw resultError;
        }

        return beer;
    }
}

module.exports = new BeerRepository();
