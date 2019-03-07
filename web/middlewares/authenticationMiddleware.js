const {authenticationService} = require('../../application/services');
const {AUTH_HEADER} = require('../constants');

const authenticationMiddleware = async function (req, res, next) {
    const token = req.headers[AUTH_HEADER];
    let updatedToken = null;
    let userId = null;

    try {
        ({
            updatedToken,
            userId
        } = await authenticationService.authenticateByToken(token));
    } catch (error) {
        return next(error);
    }

    res.set(AUTH_HEADER, updatedToken);
    res.locals.userId = userId;

    next();
};

module.exports = authenticationMiddleware;
