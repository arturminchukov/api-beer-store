const BaseService = require('./baseService');
const {beerRepository, userRepository} = require('../../dataAccess/repositories');
const {mapper} = require('../../helpers');
const {BEER_PREVIEW_INFO} = require('../constants');

class BeerService extends BaseService {
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

    async addFavoriteBeer(beerId, userId) {
        const beer = await this.getBeer(beerId);
        const beerPreviewInfo = mapper(beer, BEER_PREVIEW_INFO);

        return this._performTransaction(async (transaction) => {
            const favoriteBeer = await beerRepository.addBeer(beerPreviewInfo, transaction);

            return userRepository.addFavoriteBeer(userId, favoriteBeer, transaction);
        });
    }

    removeFavorite(beerId, userId) {
        return this._performTransaction(async (transaction) => {
            const favoriteBeer = await beerRepository.getBeerByExternalId(beerId, transaction);

            return userRepository.removeFavoriteBeer(userId, favoriteBeer, transaction);
        });
    }
}

module.exports = new BeerService();
