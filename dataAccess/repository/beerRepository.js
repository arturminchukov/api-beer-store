const apiUrl = 'https://api.punkapi.com/v2/beers';
const axios = require('axios');

class BeerRepository {
    async requestResponse(parameters) {
        const url = `${apiUrl}${parameters}`;
        const result = await axios.get(url);
        const {data} = result;

        return data;
    }

    getBeers(page = 1, itemsPerPage = 10) {
        return this.requestResponse(`?page=${page}&per_page=${itemsPerPage}`);
    }

    getBeerById(id) {
        return this.requestResponse(`/${id}`);
    }

    getBeersByQuery(beerName) {
        return this.requestResponse(`?beer_name=${encodeURIComponent(beerName)}`);
    }
}

module.exports = new BeerRepository();
