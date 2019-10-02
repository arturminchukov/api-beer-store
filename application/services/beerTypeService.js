const {beerTypeRepository} = require('../../dataAccess/repositories');

class BeerTypeService {
    addBeerType(beerType) {
        return beerTypeRepository.addBeerType(beerType);
    }

    getAllBeerTypes() {
        return beerTypeRepository.getAllBeerTypes();
    }

    getBeerType(beerTypeId) {
        return beerTypeRepository.getBeerTypeById(beerTypeId);
    }
}

module.exports = new BeerTypeService();
