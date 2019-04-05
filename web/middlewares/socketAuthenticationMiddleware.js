const {authenticationService} = require('../../application/services');
const {AUTH_HEADER} = require('../constants');

const socketAuthenticationMiddleware = async function (socket, data, response, next) {
    const tokenToCheck = data[AUTH_HEADER];
    let token = null;
    let user = null;

    try {
        ({
            token,
            user
        } = await authenticationService.authenticateByToken(tokenToCheck));
    } catch (error) {
        return next(error);
    }

    response[AUTH_HEADER] = token;
    data.locals.user = user;

    next();
};

module.exports = socketAuthenticationMiddleware;
