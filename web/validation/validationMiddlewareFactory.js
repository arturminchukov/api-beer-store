const Ajv = require('ajv');
const {UnprocessableEntityError} = require('../../errors');

const validate = function (options, data, validationSchema, next) {
    const ajv = new Ajv(options);

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

    return function (req, res, next) {
        validate({
            ...defaultOptions,
            options
        }, req, validationSchema, next);
    };
};

const socketValidationMiddlewareFactory = function (validationSchema, options) {
    const defaultOptions = {
        coerceTypes: true,
        allErrors: true,
        removeAdditional: true,
        useDefaults: true
    };

    return function (socket, data, response, next) {
        validate({
            ...defaultOptions,
            ...options
        }, data, validationSchema, next);
    };
};

module.exports = {
    expressValidationMiddlewareFactory,
    socketValidationMiddlewareFactory
};
