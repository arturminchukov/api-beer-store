const {authenticationService} = require('../../application/services');

const authenticationMiddleware = async function (req, res, next) {
    const token = req.headers['x-Auth'];
    let updatedToken = null;
    let userId = null;

    try {
        ({
            updatedToken,
            userId
        } = await authenticationService.authenticateByToken(token));
    } catch (error) {
        next(error);
    }

    res.set('x-Auth', updatedToken);
    res.local.userId = userId;

    next();
};

module.exports = authenticationMiddleware;
