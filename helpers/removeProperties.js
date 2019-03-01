const removeProperties = function (sourceObject, unnecessaryProperties) {
    const newObject = {...sourceObject};

    unnecessaryProperties.forEach((unnecessaryProperty) => {
        Reflect.deleteProperty(newObject, unnecessaryProperty);
    });

    return newObject;
};

module.exports = removeProperties;
