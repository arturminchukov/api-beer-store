const {beerService} = require('../../application').services;
const {beerValidator} = require('../validators');

class BeerController {
    async getBeers(req, res, next) {
        const {query} = req;

        let result = null;

        try {
            const filterParams = beerValidator.validateFilterParams(query);
            const pageParams = beerValidator.validatePaginationParams(query);

            result = await beerService.getBeers(pageParams, filterParams);
        } catch (error) {
            return next(error);
        }

        res.send(result);
    }

    async getBeer(req, res, next) {
        let result = null;

        try {
            const beerId = beerValidator.validateBeerId(req.params.id);

            result = await beerService.getBeer(beerId);
        } catch (error) {
            return next(error);
        }

        res.send(result);
    }
}

module.exports = new BeerController();
