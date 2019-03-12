const authenticationMiddleware = require('./authenticationMiddleware');
const errorHandleMiddleware = require('./errorHandleMiddleware');
const errorLogMiddleware = require('./errorLogMiddleware');
const favoritePaginationAuthenticationMiddleware = require('./favoritePaginationAuthenticationMiddleware');

module.exports = {
    authenticationMiddleware,
    errorHandleMiddleware,
    errorLogMiddleware,
    favoritePaginationAuthenticationMiddleware
};
