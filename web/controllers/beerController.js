const {beerService} = require('../../application/services');
const {FILTER_PARAMS_SCHEMA, PAGINATION_PARAMS_SCHEMA} = require('../constants');
const {mapper} = require('../../helpers');

class BeerController {
    async getBeers(req, res) {
        const {query} = req;
        const {user} = res.locals;
        const pageParams = mapper(query, PAGINATION_PARAMS_SCHEMA);
        const filterParams = mapper(query, FILTER_PARAMS_SCHEMA);

        const paginatedBeers = await beerService.getBeers(pageParams, filterParams, user);

        res.send(paginatedBeers);
    }

    async getBeer(req, res) {
        const beerId = req.params.id;
        const {user} = res.locals;

        const result = await beerService.getBeer(beerId, user);

        res.send(result);
    }

    async addFavorite(req, res) {
        const beerId = req.params.externalId;
        const {user} = res.locals;

        await beerService.addFavoriteBeer(beerId, user);

        res.status(204)
            .send('helo');
    }

    async removeFavorite(req, res) {
        const beerId = req.params.externalId;
        const {user} = res.locals;

        await beerService.removeFavorite(beerId, user);

        res.status(204)
            .end();
    }
}

module.exports = new BeerController();
