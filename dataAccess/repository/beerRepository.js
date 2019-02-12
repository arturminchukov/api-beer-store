const config = require('config');
const {apiUrl} = config.get('constants');
const axios = require('axios');
const statuses = require('statuses');

class BeerRepository {
    async get(url, params) {
        try {
            const apiInstance = axios.create({
                baseURL: apiUrl
            });
            const result = await apiInstance.request({
                url,
                params
            });
            const {data} = result;

            return data;
        } catch (e) {
            const statusCode = 424;

            const error = {
                statusCode,
                message: statuses.STATUS_CODES[statusCode]
            };

            throw error;
        }
    }
}

module.exports = new BeerRepository();
