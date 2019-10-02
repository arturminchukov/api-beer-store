const {brewRepository} = require('../../dataAccess/repositories');

class BrewService {
    getBrews(paginationParams) {
        return brewRepository.getBrews(paginationParams);
    }

    getBrew(brewId) {
        return brewRepository.getBrewById(brewId);
    }

    addBrew(brewModel) {
        return brewRepository.addBrew(brewModel);
    }
}

module.exports = new BrewService();
