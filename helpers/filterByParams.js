const filterByParams = function (query, paramNames) {
    return paramNames.reduce((params, key) => {
        if (query[key]) {
            params[key] = query[key];
        }

        return params;
    }, {});
};

module.exports = filterByParams;
