const mapper = function (properties, map) {
    if (!properties) {
        return;
    }

    const newProperties = {};
    const propertiesKeys = Object.keys(properties);

    propertiesKeys.forEach((paramKey) => {
        newProperties[map[paramKey]] = properties[paramKey];
    });

    return newProperties;
};

module.exports = mapper;
