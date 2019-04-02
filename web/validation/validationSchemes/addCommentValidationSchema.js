module.exports = {
    required: ['x-auth', 'comment', 'brewId'],
    properties: {
        'x-auth': {
            type: 'string'
        },
        comment: {
            type: 'string',
            minLength: 1
        },
        brewId: {
            type: 'integer',
            minimum: 1
        }
    }
};
