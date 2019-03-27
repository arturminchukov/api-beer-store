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
                sortBy: {
                    type: 'string',
                    enum: ['id', 'date', 'location', 'brew_name', 'beer_type_id', 'created_at', 'updated_at'],
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
