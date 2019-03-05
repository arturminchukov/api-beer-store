const {beerService} = require('../../application/services');
const {FILTER_PARAMS_SCHEMA, PAGINATION_PARAMS_SCHEMA} = require('../constants');

class BeerController {
    async getBeers(req, res) {
        const {query} = req;
        const filterParams = this._filterByParams(query, FILTER_PARAMS_SCHEMA);
        const pageParams = this._filterByParams(query, PAGINATION_PARAMS_SCHEMA);

        const result = await beerService.getBeers(pageParams, filterParams);

        res.send(result);
    }

    async getBeer(req, res) {
        const beerId = req.params.id;

        const result = await beerService.getBeer(beerId);

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
