const {beerRepository} = require('../../dataAccess/repositories');

class BeerService {
    getBeers(paginationParams, filterParams, userId) {
        return beerRepository.getAll(userId, paginationParams, filterParams);
    }

    getBeer(beerId, userId) {
        return beerRepository.getBeerById(userId, beerId);
    }

    addFavoriteBeer(beerId, userId) {
        return beerRepository.addFavoriteBeer(userId, beerId);
    }

    removeFavorite(beerId, userId) {
        return beerRepository.removeFavoriteBeer(userId, beerId);
    }
}

module.exports = new BeerService();
