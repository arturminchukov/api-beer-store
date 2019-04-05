module.exports = {
    required: ['x-auth', 'comment'],
    properties: {
        comment: {
            required: ['text', 'brewId'],
            properties: {
                text: {
                    type: 'string',
                    minLength: 1
                },
                brewId: {
                    type: 'integer',
                    minimum: 1
                }
            }
        },
        'x-auth': {
            type: 'string'
        }
    }
};
