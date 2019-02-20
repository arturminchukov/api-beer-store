const {beerRepository} = require('../../dataAccess/repositories');

class BeerService {
    async getBeers(paginationParams, filterParams) {
        const beers = await beerRepository.getAll(paginationParams, filterParams);

        return {
            pageNumber: paginationParams.pageNumber,
            pageSize: paginationParams.pageSize,
            items: beers,
            count: beers.length
        };
    }

    getBeer(beerId) {
        return beerRepository.get(beerId);
    }
}

module.exports = new BeerService();
