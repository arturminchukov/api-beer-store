const sequelize = require('../../dataAccess/getSequelize');

class BaseService {
    _performTransaction(callback) {
        return sequelize.transaction(callback);
    }
}

module.exports = BaseService;
