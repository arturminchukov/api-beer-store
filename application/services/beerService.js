const {beerRepository} = require('../../dataAccess/repository');

class BeerService {
    async getBeers(pageParams, filterParams) {
        const beers = await beerRepository.getAll(pageParams, filterParams);

        return {
            pageNumber: pageParams.pageNumber,
            perPage: pageParams.perPage,
            items: beers,
            count: beers.length
        };
    }

    getBeer(beerId) {
        return beerRepository.get(beerId);
    }
}

module.exports = new BeerService();
