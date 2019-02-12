const config = require('config');
const {beerService} = require('../../application').services;
const {validFilterParams, validParams} = config.get('constants');
const statuses = require('statuses');

class BeerController {
    async getBeers(req, res) {
        try {
            const {query} = req;
            let result = null;

            if (query.beer_name) {
                const params = this.filterByParams(query, validFilterParams);

                result = await beerService.getBeers(params);
            } else if (query.page && query.per_page) {
                const params = this.filterByParams(query, validParams);

                result = await beerService.getBeers(params);
            } else {
                const statusCode = 421;

                res.status(statusCode);
                result = {
                    statusCode,
                    message: statuses.STATUS_CODES[statusCode]
                };
            }

            res.send(result);
        } catch (e) {
            res.status(e.statusCode)
                .send(e);
        }
    }

    async getBeer(req, res) {
        try {
            const beerId = req && req.params && req.params.id;
            const result = await beerService.getBeer(beerId);

            res.send(result);
        } catch (e) {
            res.status(e.statusCode)
                .send(e);
        }
    }

    filterByParams(query, paramNames) {
        return paramNames.reduce((params, key) => {
            if (query[key]) {
                params[key] = query[key];
            }
            return params;
        }, {});
    }
}

module.exports = new BeerController();
