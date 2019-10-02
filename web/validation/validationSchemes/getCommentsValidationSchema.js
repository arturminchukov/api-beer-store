module.exports = {
    required: ['x-auth', 'params'],
    properties: {
        'x-auth': {
            type: 'string'
        },
        params: {
            required: ['brewId'],
            properties: {
                brewId: {
                    type: 'integer'
                },
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
