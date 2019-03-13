const {beerService} = require('../../application/services');
const {FILTER_PARAMS_SCHEMA, PAGINATION_PARAMS_SCHEMA} = require('../constants');
const {mapper} = require('../../helpers');

class BeerController {
    async getBeers(req, res) {
        const {query} = req;
        const {userId} = res.locals;
        const pageParams = mapper(query, PAGINATION_PARAMS_SCHEMA);
        let paginatedBeers = null;

        if (query.isFavorite) {
            paginatedBeers = await beerService.getFavoriteBeers(userId, pageParams);
        } else {
            const filterParams = mapper(query, FILTER_PARAMS_SCHEMA);

            paginatedBeers = await beerService.getBeers(pageParams, filterParams, userId);
        }

        res.send(paginatedBeers);
    }

    async getBeer(req, res) {
        const beerId = req.params.id;

        const result = await beerService.getBeer(beerId);

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
