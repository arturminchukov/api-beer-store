const {beerRepository} = require('../../dataAccess/repository');

class BeerService {
    getBeers(query) {
        if (query && query.beer_name) {
            return beerRepository.getBeersByQuery(query.beer_name);
        }

        const {page, per_page: perPage} = query;

        if (page && perPage) {
            return beerRepository.getBeers(page, perPage);
        }
    }

    getBeer(beerId) {
        return beerRepository.getBeerById(beerId);
    }
}

module.exports = new BeerService();
