const {beerService} = require('../../application').services;
const {VALID_PAGE_PARAMS, VALID_FILTER_PARAMS, DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE} = require('../../constants').web;

class BeerController {
    async getBeers(req, res, next) {
        const {query} = req;
        const filterParams = this._filterByParams(query, VALID_FILTER_PARAMS);
        const pageParams = this._filterByParams(query, VALID_PAGE_PARAMS);

        let result = null;

        if (!pageParams.page) {
            pageParams.page = DEFAULT_PAGE_NUMBER;
        }

        if (!pageParams.perPage) {
            pageParams.perPage = DEFAULT_PER_PAGE;
        }

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
