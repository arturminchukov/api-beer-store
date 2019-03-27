module.exports = {
    properties: {
        body: {
            required: ['externalBeerId', 'date', 'brewName', 'beerTypeId'],
            properties: {
                externalBeerId: {
                    type: 'integer',
                    minimum: 1
                },
                date: {
                    type: 'integer'
                },
                location: {
                    type: 'string',
                    maxLength: 512
                },
                ingredients: {
                    type: 'object'
                },
                brewingMethod: {
                    type: ['array', 'object']
                },
                brewName: {
                    type: 'string',
                    maxLength: 128
                },
                imagesCollection: {
                    type: 'array'
                },
                impressions: {
                    type: 'string'
                },
                beer_type_id: {
                    type: 'integer'
                }
            }
        }
    }
};
