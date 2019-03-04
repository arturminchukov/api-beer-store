module.exports = {
    properties: {
        body: {
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    maxLength: 64,
                    minLength: 4
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 64
                }
            }
        }
    }
};
