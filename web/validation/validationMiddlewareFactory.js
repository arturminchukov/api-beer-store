const Ajv = require('ajv');
const {UnprocessableEntityError} = require('../../errors');

const validationMiddlewareFactory = function (validationSchema, options) {
    const defaultOptions = {
        coerceTypes: true,
        allErrors: true,
        removeAdditional: true,
        useDefaults: true
    };

    return function (req, res, next) {
        const ajv = new Ajv({
            ...defaultOptions,
            ...options
        });

        const valid = ajv.validate(validationSchema, req);

        if (!valid) {
            next(new UnprocessableEntityError('Invalid parameters', ajv.errors));
        }

        next();
    };
};

module.exports = validationMiddlewareFactory;
