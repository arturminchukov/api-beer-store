const {authenticationService} = require('../../application/services');
const {AUTH_HEADER} = require('../constants');

const authenticationMiddleware = async function (req, res, next) {
    const tokenToCheck = req.headers[AUTH_HEADER];
    let token = null;
    let userId = null;

    try {
        ({
            token,
            userId
        } = await authenticationService.authenticateByToken(tokenToCheck));
    } catch (error) {
        return next(error);
    }

    res.set(AUTH_HEADER, token);
    res.locals.userId = userId;

    next();
};

module.exports = authenticationMiddleware;
