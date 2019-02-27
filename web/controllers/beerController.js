const {beerService} = require('../../application/services');
const {FILTER_PARAMS_SCHEMA, PAGINATION_PARAMS_SCHEMA} = require('../constants');

class BeerController {
    async getBeers(req, res, next) {
        const {query} = req;
        const filterParams = this._filterByParams(query, FILTER_PARAMS_SCHEMA);
        const pageParams = this._filterByParams(query, PAGINATION_PARAMS_SCHEMA);

        try {
            const result = await beerService.getBeers(pageParams, filterParams);

            res.send(result);
        } catch (error) {
            next(error);
        }
    }

    async getBeer(req, res, next) {
        const beerId = req.params.id;

        try {
            const result = await beerService.getBeer(beerId);

            res.send(result);
        } catch (error) {
            return next(error);
        }
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
