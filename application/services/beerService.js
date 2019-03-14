const {beerRepository, userRepository} = require('../../dataAccess/repositories');

class BeerService {
    async getBeers(paginationParams, filterParams, userId) {
        const user = await this._getUserById(userId);

        return beerRepository.getAll(user, paginationParams, filterParams);
    }

    async getBeer(beerId, userId) {
        const user = await this._getUserById(userId);

        return beerRepository.getBeerById(user, beerId);
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
