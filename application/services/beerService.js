const {beerRepository} = require('../../dataAccess/repositories');

class BeerService {
    getBeers(paginationParams, filterParams, user) {
        return beerRepository.getAll(user.id, paginationParams, filterParams);
    }

    getBeer(beerId, user) {
        return beerRepository.getBeerById(user.id, beerId);
    }

    addFavoriteBeer(beerId, user) {
        return beerRepository.addFavoriteBeer(user.id, beerId);
    }

    removeFavorite(beerId, user) {
        return beerRepository.removeFavoriteBeer(user.id, beerId);
    }
}

module.exports = new BeerService();
