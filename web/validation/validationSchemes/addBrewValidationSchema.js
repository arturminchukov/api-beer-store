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
                    type: 'string'
                },
                brewingMethod: {
                    type: 'string'
                },
                brewName: {
                    type: 'string',
                    maxLength: 128
                },
                images_collection: {
                    type: 'string'
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
