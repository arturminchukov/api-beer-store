module.exports = {
    required: ['x-auth'],
    properties: {
        'x-auth': {
            type: 'string'
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
};
