const revertMap = function (map) {
    const keys = Object.keys(map);
    const result = {};

    keys.forEach((key) => {
        result[map[key]] = key;
    });

    return result;
};

module.exports = revertMap;
