module.exports = {
    properties: {
        body: {
            required: ['name'],
            properties: {
                name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 64
                }
            }
        }
    }
};
