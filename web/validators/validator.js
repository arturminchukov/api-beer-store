const Ajv = require('ajv');
const {BadRequestError} = require('../../errors');

class Validator {
    constructor(options) {
        this.ajv = new Ajv(options);
    }

    _validate(schema, data) {
        const valid = this.ajv.validate(schema, data);

        if (!valid) {
            throw new BadRequestError('invalid parameters', this.ajv.errors[0]);
        }
    }
}

module.exports = Validator;
