const {beerRepository} = require('../../dataAccess/repository');
const {DEFAULT_PER_PAGE, DEFAULT_PAGE} = require('../../constants').beers;

class BeerService {
    async getBeers(pageParams, filterParams) {
        const beers = await beerRepository.getAll(pageParams, filterParams);

        return this.createResult(beers, pageParams.page, pageParams.perPage);
    }

    async getBeer(beerId) {
        const beer = await beerRepository.get(beerId);

        return this.createResult(beer, 1, 1);
    }

    createResult(items, page, perPage) {
        return {
            page: page || DEFAULT_PAGE,
            perPage: perPage || DEFAULT_PER_PAGE,
            items: items || [],
            count: items.length || 0
        };
    }
}

module.exports = new BeerService();
