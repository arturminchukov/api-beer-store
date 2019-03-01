const routerWrapper = function (routerHandler) {
    return async function (req, res, next) {
        try {
            await routerHandler(req, res);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = routerWrapper;
