const {beerRepository, favoriteRepository, userRepository} = require('../../dataAccess/repositories');
const {UnprocessableEntityError} = require('../../errors');
const {filterByParams} = require('../../helpers');
const {BEER_PREVIEW_INFO} = require('../constants');

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

    async addFavorite(beerId, userId) {
        const beer = await this.getBeer(beerId);
        const beerPreviewInfo = filterByParams(beer, BEER_PREVIEW_INFO);

        let favoriteBeer = null;

        try {
            favoriteBeer = await favoriteRepository.addFavorite(beerPreviewInfo);
        } catch (error) {
            if (!(error instanceof UnprocessableEntityError) && error.message !== 'Such favorite id already exist') {
                throw error;
            }

            favoriteBeer = await favoriteRepository.getFavoriteByForeignId(beerId);
        }

        return userRepository.addFavorite(userId, favoriteBeer);
    }

    async removeFavorite(beerId, userId) {
        const favoriteBeer = await favoriteRepository.getFavoriteByForeignId(beerId);

        return userRepository.removeFavorite(userId, favoriteBeer);
    }
}

module.exports = new BeerService();
