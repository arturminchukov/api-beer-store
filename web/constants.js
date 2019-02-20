const BEERS_VALIDATION_SCHEMA = {
    properties: {
        query: {
            additionalProperties: false,
            properties: {
                pageNumber: {
                    type: 'integer',
                    default: 1
                },
                pageSize: {
                    type: 'integer',
                    default: 25
                },
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
        }
    }
};

const BEER_VALIDATION_SCHEMA = {
    properties: {
        params: {
            properties: {
                id: {
                    type: 'integer',
                    minimum: 1
                }
            }
        }
    }
};


module.exports = {
    BEER_VALIDATION_SCHEMA,
    BEERS_VALIDATION_SCHEMA,
    PAGINATION_PARAMS_SCHEMA: ['pageNumber', 'pageSize'],
    FILTER_PARAMS_SCHEMA: ['beerName', 'alcoholByVolumeGreat', 'alcoholByVolumeLess', 'internationalBitternessUnitsGreat', 'internationalBitternessUnitsLess', 'colorEbcGreat', 'colorEbcLess']
};
