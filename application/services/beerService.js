const {beerRepository} = require('../../dataAccess/repositories');

class BeerService {
    async getBeers(paginationParams, filterParams) {
        const beers = await beerRepository.getAll(paginationParams, filterParams);

        return {
            pageNumber: paginationParams.pageNumber,
            pageSize: paginationParams.pageSize,
            items: beers
        };
    }

    getBeer(beerId) {
        return beerRepository.get(beerId);
    }
}

module.exports = new BeerService();
