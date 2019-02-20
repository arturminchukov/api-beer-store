const {beerService} = require('../../application').services;
const {FILTER_PARAMS_SCHEMA, PAGINATION_PARAMS_SCHEMA} = require('../constants');

class BeerController {
    async getBeers(req, res, next) {
        const {query} = req;
        const filterParams = this._filterByParams(query, FILTER_PARAMS_SCHEMA);
        const pageParams = this._filterByParams(query, PAGINATION_PARAMS_SCHEMA);

        let result = null;

        try {
            result = await beerService.getBeers(pageParams, filterParams);
        } catch (error) {
            return next(error);
        }

        res.send(result);
    }

    async getBeer(req, res, next) {
        const beerId = req.params.id;
        let result = null;

        try {
            result = await beerService.getBeer(beerId);
        } catch (error) {
            return next(error);
        }

        res.send(result);
    }

    _filterByParams(query, paramNames) {
        return paramNames.reduce((params, key) => {
            if (query[key]) {
                params[key] = query[key];
            }
            return params;
        }, {});
    }
}

module.exports = new BeerController();
