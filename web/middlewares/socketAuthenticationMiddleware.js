const {authenticationService} = require('../../application/services');
const {AUTH_HEADER} = require('../constants');

const socketAuthenticationMiddleware = async function (socket, data, response, next) {
    const tokenToCheck = data[AUTH_HEADER];
    const {
        token,
        user
    } = await authenticationService.authenticateByToken(tokenToCheck);

    response[AUTH_HEADER] = token;
    data.locals = user;

    next();
};

module.exports = socketAuthenticationMiddleware;
