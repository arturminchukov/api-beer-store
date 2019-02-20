const Ajv = require('ajv');
const {UnprocessableEntityError} = require('../../errors');

class ValidatorFactory {
    constructor() {
        this.options = {
            coerceTypes: true,
            allErrors: true,
            removeAdditional: true,
            useDefaults: true
        };
    }

    getValidator(validationSchema, options) {
        const defaultOptions = this.options;

        return function (req, res, next) {
            const ajv = new Ajv({
                ...defaultOptions,
                ...options
            });
            const valid = ajv.validate(validationSchema, req);

            if (!valid) {
                throw new UnprocessableEntityError('Invalid parameters', ajv.errors);
            }

            next();
        };
    }
}

module.exports = new ValidatorFactory();
