const crypto = require('crypto');

const createHash = function (data) {
    return crypto
        .createHash('sha256')
        .update(data)
        .digest('hex');
};

module.exports = createHash;
