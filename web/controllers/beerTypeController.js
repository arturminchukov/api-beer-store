const {beerTypeService} = require('../../application/services');

class BeerTypeController {
    async getBeerType(req, res) {
        const beerTypeId = req.params.id;

        const beerType = await beerTypeService.getBeerType(beerTypeId);

        res.status(200)
            .send(beerType);
    }

    async getBeersTypes(req, res) {
        const beerTypes = await beerTypeService.getAllBeerTypes();

        res.status(200)
            .send(beerTypes);
    }

    async addBeerType(req, res) {
        const beerType = req.body;

        const addedBeerType = await beerTypeService.addBeerType(beerType);

        res.status(200)
            .send(addedBeerType);
    }
}

module.exports = new BeerTypeController();
