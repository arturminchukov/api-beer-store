const mapper = function (properties, map) {
    if (!properties) {
        return;
    }

    const newProperties = {};
    const mapIsArray = map instanceof Array;
    let mapKeys = null;

    if (mapIsArray) {
        mapKeys = map;
    } else {
        mapKeys = Object.keys(map);
    }

    mapKeys.forEach((mapKey) => {
        if (properties[mapKey]) {
            if (mapIsArray) {
                newProperties[mapKey] = properties[mapKey];
            } else {
                newProperties[map[mapKey]] = properties[mapKey];
            }
        }
    });

    return newProperties;
};

module.exports = mapper;
