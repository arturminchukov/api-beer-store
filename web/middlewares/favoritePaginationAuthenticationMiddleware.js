const authenticationMiddleware = require('./authenticationMiddleware');

const favoritePaginationAuthenticationMiddleware = function (req, res, next) {
    if (req.query && req.query.isFavorite) {
        return authenticationMiddleware(req, res, next);
    }

    next();
};

module.exports = favoritePaginationAuthenticationMiddleware;
