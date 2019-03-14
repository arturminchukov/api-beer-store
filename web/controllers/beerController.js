const {beerService} = require('../../application/services');
const {FILTER_PARAMS_SCHEMA, PAGINATION_PARAMS_SCHEMA} = require('../constants');
const {mapper} = require('../../helpers');

class BeerController {
    async getBeers(req, res) {
        const {query} = req;
        const {userId} = res.locals;
        const pageParams = mapper(query, PAGINATION_PARAMS_SCHEMA);
        const filterParams = mapper(query, FILTER_PARAMS_SCHEMA);

        const paginatedBeers = await beerService.getBeers(pageParams, filterParams, userId);

        res.send(paginatedBeers);
    }

    async getBeer(req, res) {
        const beerId = req.params.id;
        const {userId} = res.locals;

        const result = await beerService.getBeer(beerId, userId);

        res.send(result);
    }

    async addFavorite(req, res) {
        const beerId = req.params.id;
        const {userId} = res.locals;

        await beerService.addFavoriteBeer(beerId, userId);

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
