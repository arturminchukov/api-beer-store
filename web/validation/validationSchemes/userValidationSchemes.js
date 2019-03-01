const USER_REGISTRATION_VALIDATION_SCHEMA = {
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
                },
                firstName: {
                    type: 'string',
                    maxLength: 64,
                    minLength: 1
                },
                lastName: {
                    type: 'string',
                    maxLength: 64,
                    minLength: 1
                },
                birthday: {
                    type: 'integer'
                },
                imageUrl: {
                    type: 'string',
                    format: 'uri',
                    maxLength: 512,
                    minLength: 6
                }
            }
        }
    }
};

const USER_AUTHENTICATION_VALIDATION_SCHEMA = {
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

module.exports = {
    USER_REGISTRATION_VALIDATION_SCHEMA,
    USER_AUTHENTICATION_VALIDATION_SCHEMA
};
