const {authenticationService} = require('../../application/services');
const {AUTH_HEADER} = require('../constants');

const socketAuthenticationMiddleware = async function (socket) {
    const tokenToCheck = socket.handshake.query[AUTH_HEADER];
    let user = null;

    try {
        ({user} = await authenticationService.authenticateByToken(tokenToCheck));
    } catch (error) {
        socket.close();
    }

    socket.locals = {user};
    return user;
};

module.exports = socketAuthenticationMiddleware;
