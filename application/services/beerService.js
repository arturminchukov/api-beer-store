const {beerRepository, userRepository} = require('../../dataAccess/repositories');
const sequelize = require('../../dataAccess/getSequelize');
const {mapper} = require('../../helpers');
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

    async addFavoriteBeer(beerId, userId) {
        const beer = await this.getBeer(beerId);
        const beerPreviewInfo = mapper(beer, BEER_PREVIEW_INFO);

        return sequelize.transaction(async (transaction) => {
            const favoriteBeer = await beerRepository.addBeer(beerPreviewInfo, transaction);

            return userRepository.addFavoriteBeer(userId, favoriteBeer, transaction);
        });
    }

    removeFavorite(beerId, userId) {
        return sequelize.transaction(async (transaction) => {
            const favoriteBeer = await beerRepository.getBeerByExternalId(beerId, transaction);

            return userRepository.removeFavoriteBeer(userId, favoriteBeer, transaction);
        });
    }
}

module.exports = new BeerService();
