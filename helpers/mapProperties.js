const mapProperties = function (properties, mapper) {
    if (!properties) {
        return;
    }

    const newProperties = {};
    const propertiesKeys = Object.keys(properties);

    propertiesKeys.forEach((paramKey) => {
        newProperties[mapper[paramKey]] = properties[paramKey];
    });

    return newProperties;
};

module.exports = mapProperties;
