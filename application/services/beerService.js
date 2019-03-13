const BaseService = require('./baseService');
const {beerRepository, userRepository} = require('../../dataAccess/repositories');
const {mapper} = require('../../helpers');
const {BEER_PREVIEW_INFO} = require('../constants');

class BeerService extends BaseService {
    async getBeers(paginationParams, filterParams, userId) {
        const beers = await beerRepository.getAll(paginationParams, filterParams, userId);

        return {
            pageNumber: paginationParams.pageNumber,
            pageSize: paginationParams.pageSize,
            items: beers
        };
    }

    getBeer(beerId) {
        return beerRepository.get(beerId);
    }

    async getFavoriteBeers(userId, paginationParams) {
        const {items, count} = await userRepository.getPaginatedFavoriteBeers(userId, paginationParams);
        const next = this._getNext(paginationParams.pageNumber, paginationParams.pageSize, count);

        return {
            items,
            count,
            next
        };
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

    _getNext(currentPage, pageSize, count) {
        if (currentPage * pageSize < count) {
            return {
                pageSize,
                pageNumber: currentPage + 1
            };
        }

        return null;
    }
}

module.exports = new BeerService();
