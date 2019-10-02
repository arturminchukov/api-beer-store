const expressRouterWrapper = function (routerHandler) {
    return async function (req, res, next) {
        try {
            await routerHandler(req, res);
        } catch (error) {
            next(error);
        }
    };
};

const socketRouterWrapper = function (routerHandler) {
    return async function (socket, req, response, next) {
        try {
            await routerHandler(socket, req, response);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    expressRouterWrapper,
    socketRouterWrapper
};
