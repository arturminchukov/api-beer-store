const {beerService} = require('../../application/services');
const {FILTER_PARAMS_SCHEMA, PAGINATION_PARAMS_SCHEMA} = require('../constants');
const {filterByParams} = require('../../helpers');

class BeerController {
    async getBeers(req, res) {
        const {query} = req;
        const filterParams = filterByParams(query, FILTER_PARAMS_SCHEMA);
        const pageParams = filterByParams(query, PAGINATION_PARAMS_SCHEMA);

        const result = await beerService.getBeers(pageParams, filterParams);

        res.send(result);
    }

    async getBeer(req, res) {
        const beerId = req.params.id;

        const result = await beerService.getBeer(beerId);

        res.send(result);
    }

    async addFavorite(req, res) {
        const beerId = req.params.id;
        const {userId} = res.locals;

        await beerService.addFavorite(beerId, userId);

        res.status(204)
            .end();
    }

    async removeFavorite(req, res) {
        const beerId = req.params.id;
        const {userId} = res.locals;

        await beerService.removeFavorite(beerId, userId);

        res.status(204)
            .end();
    }
}

module.exports = new BeerController();
