const Ajv = require('ajv');
const {UnprocessableEntityError} = require('../errors');

class Validator {
    getValidator(validationSchema, options) {
        return function (req, res, next) {
            const ajv = new Ajv(options);
            const valid = ajv.validate(validationSchema, req);

            if (!valid) {
                throw new UnprocessableEntityError('Invalid parameters', ajv.errors);
            }

            next();
        };
    }
}

module.exports = new Validator();
