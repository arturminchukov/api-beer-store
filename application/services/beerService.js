const {beerRepository} = require('../../dataAccess/repository');

class BeerService {
    async getBeers(paginationParams, filterParams) {
        const beers = await beerRepository.getAll(paginationParams, filterParams);

        return {
            pageNumber: paginationParams.pageNumber,
            perPage: paginationParams.perPage,
            items: beers,
            count: beers.length
        };
    }

    getBeer(beerId) {
        return beerRepository.get(beerId);
    }
}

module.exports = new BeerService();
