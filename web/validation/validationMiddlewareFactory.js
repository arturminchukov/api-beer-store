const Ajv = require('ajv');
const {UnprocessableEntityError} = require('../../errors');

const validate = function (ajv, data, validationSchema, next) {
    const valid = ajv.validate(validationSchema, data);

    if (!valid) {
        return next(new UnprocessableEntityError('Invalid parameters', ajv.errors));
    }

    next();
};

const expressValidationMiddlewareFactory = function (validationSchema, options) {
    const defaultOptions = {
        coerceTypes: true,
        allErrors: true,
        removeAdditional: true,
        useDefaults: true
    };

    const ajv = new Ajv({
        ...defaultOptions,
        ...options
    });

    return function (req, res, next) {
        validate(ajv, req, validationSchema, next);
    };
};

const socketValidationMiddlewareFactory = function (validationSchema, options) {
    const defaultOptions = {
        coerceTypes: true,
        allErrors: true,
        removeAdditional: true,
        useDefaults: true
    };

    const ajv = new Ajv({
        ...defaultOptions,
        ...options
    });

    return function (socket, data, response, next) {
        validate(ajv, data, validationSchema, next);
    };
};

module.exports = {
    expressValidationMiddlewareFactory,
    socketValidationMiddlewareFactory
};
