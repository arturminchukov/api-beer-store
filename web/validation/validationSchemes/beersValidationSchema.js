module.exports = {
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
                },
                isFavorite: {
                    type: 'boolean'
                },
                sortBy: {
                    type: 'string',
                    enum: ['id', 'external_id', 'created_at', 'updated_at', 'name', 'tagline'],
                    default: 'updated_at'
                },
                sortByDirection: {
                    type: 'string',
                    enum: ['asc', 'desc'],
                    default: 'desc'
                }
            }
        }
    }
};
