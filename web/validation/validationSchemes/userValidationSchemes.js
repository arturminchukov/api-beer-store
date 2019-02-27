const USER_VALIDATION_SCHEMA = {
    properties: {
        body: {
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    maxLength: 64
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 64
                },
                firstName: {
                    type: 'string',
                    maxLength: 64,
                    removeIfEmpty: true
                },
                lastName: {
                    type: 'string',
                    maxLength: 64,
                    removeIfEmpty: true
                },
                birthday: {
                    if: {
                        maxLength: 0,
                        minLength: 0
                    },
                    then: {removeIfEmpty: true},
                    else: {
                        type: 'integer'
                    }
                },
                imageUrl: {
                    type: 'string',
                    format: 'uri',
                    maxLength: 512,
                    removeIfEmpty: true,
                }
            }
        }
    }
};

module.exports = {
    USER_VALIDATION_SCHEMA
};
