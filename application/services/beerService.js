const {beerRepository, userRepository} = require('../../dataAccess/repositories');

class BeerService {
    getBeers(paginationParams, filterParams, userId) {
        return beerRepository.getAll(userId, paginationParams, filterParams);
    }

    getBeer(beerId, userId) {
        return beerRepository.getBeerById(userId, beerId);
    }

    async addFavoriteBeer(beerId, userId) {
        const user = await this._getUserById(userId);

        return beerRepository.addFavoriteBeer(user, beerId);
    }

    async removeFavorite(beerId, userId) {
        const user = await this._getUserById(userId);

        return beerRepository.removeFavoriteBeer(user, beerId);
    }

    _getUserById(id) {
        return userRepository.getUserById(id);
    }
}

module.exports = new BeerService();
