const applySocketMiddleware = function (socket, errorHandler) {
    return function (eventName) {
        return function (...args) {
            return function (data) {
                const response = {};
                const middlewareFunctions = [];

                data.locals = {};

                middlewareFunctions.push(() => {
                    const next = (error) => {
                        if (error) {
                            return errorHandler(socket, data, response, {
                                error,
                                eventName
                            });
                        }
                    };

                    args[args.length - 1](socket, data, response, next);
                });

                for (let i = args.length - 2, j = 0; i >= 0; i--, j++) {
                    middlewareFunctions.push(() => {
                        const next = (error) => {
                            if (error) {
                                return errorHandler(socket, data, response, {
                                    error,
                                    eventName
                                });
                            }

                            middlewareFunctions[j]();
                        };

                        args[i](socket, data, response, next);
                    });
                }

                middlewareFunctions[middlewareFunctions.length - 1]();
            };
        };
    };
};

module.exports = applySocketMiddleware;
