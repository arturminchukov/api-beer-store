const Validator = require('./validator');
const {NUMBER_FILTER_SCHEMA, NUMBER_PAGINATION_SCHEMA} = require('../constants');

const paginationValidateSchema = {
    additionalProperties: false,
    properties: {
        pageNumber: {
            type: 'integer',
            default: 1
        },
        perPage: {
            type: 'integer',
            default: 25
        }
    }
};

const filterValidateSchema = {
    additionalProperties: false,
    properties: {
        beerName: {
            type: 'string'
        },
        alcoholByVolumeGreat: {
            type: 'integer'
        },
        alcoholByVolumeLess: {
            type: 'integer'
        },
        internationalBitternessUnitsGreat: {
            type: 'integer'
        },
        internationalBitternessUnitsLess: {
            type: 'integer'
        },
        colorEbcGreat: {
            type: 'integer'
        },
        colorEbcLess: {
            type: 'integer'
        }
    }
};

const beerIdSchema = {
    type: 'integer',
    minimum: 1
};


class BeerValidator extends Validator {
    constructor() {
        super({
            useDefaults: true,
            removeAdditional: true
        });
    }

    validateBeerId(beerId) {
        const numberBeerId = Number(beerId);

        this._validate(beerIdSchema, Number(numberBeerId));

        return numberBeerId;
    }

    validatePaginationParams(params) {
        return this._validateParams(params, paginationValidateSchema, NUMBER_PAGINATION_SCHEMA);
    }

    validateFilterParams(params) {
        return this._validateParams(params, filterValidateSchema, NUMBER_FILTER_SCHEMA);
    }

    _validateParams(params, validateSchema, numberPropertySchema) {
        const paramsCopy = {...params};

        this._stringPropertiesToNumber(paramsCopy, numberPropertySchema);
        this._validate(validateSchema, paramsCopy);

        return paramsCopy;
    }

    _stringPropertiesToNumber(properties, numberPropertySchema) {
        numberPropertySchema.forEach((propertyName) => {
            if (properties[propertyName]) {
                properties[propertyName] = Number(properties[propertyName]);
            }
        });
    }
}

module.exports = new BeerValidator();
