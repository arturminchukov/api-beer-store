const {beerRepository} = require('../../dataAccess/repository');


class BeerService {
    constructor() {
        this.entityName = 'beers';
    }

    async getBeers(params) {
        if (params) {
            const data = await beerRepository.get(this.entityName, params);

            return this.createResult(data, params.page, params.per_page);
        }
    }

    async getBeer(beerId) {
        const data = await beerRepository.get(`${this.entityName}/${beerId}`);

        return this.createResult(data);
    }

    createResult(items, page, perPage) {
        return {
            page: page || 0,
            perPage: perPage || 0,
            items: items || [],
            count: items.length || 0
        };
    }
}

module.exports = new BeerService();
