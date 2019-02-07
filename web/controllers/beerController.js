const {beerService} = require('../../application').services;

class BeerController {
    async handleBeers(req, res) {
        const {query} = req;

        if (!query) {
            res.status(204);
            res.send();

            return;
        }

        const result = await beerService.getBeers(query);

        res.send(result);
    }

    async handleBeer(req, res) {
        const beerId = req && req.params && req.params.id;

        if (!beerId) {
            res.status(204);
            res.send();

            return;
        }

        const result = await beerService.getBeer(beerId);

        res.send(result);
    }
}

module.exports = new BeerController();
