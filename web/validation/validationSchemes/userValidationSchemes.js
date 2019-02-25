const USER_VALIDATION_SCHEMA = {
    properties: {
        body: {
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 30
                },
                firstName: {
                    type: 'string'
                },
                lastName: {
                    type: 'string'
                },
                birthday: {
                    if: {
                        maxLength: 0,
                        minLength: 0
                    },
                    then: {type: 'string'},
                    else: {
                        type: 'string',
                        format: 'date'
                    }
                },
                imageUrl: {
                    type: 'string',
                    format: 'uri'
                }
            }
        }
    }
};

module.exports = {
    USER_VALIDATION_SCHEMA
};
