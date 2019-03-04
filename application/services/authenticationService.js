const config = require('config');

const {createHash, asyncJwt} = require('../../helpers');
const {UnprocessableEntityError, InternalServerError} = require('../../errors');

const SECRET_TOKEN_KEY = config.get('SECRET_TOKEN_KEY');

class AuthenticationService {
    async authenticate(passwordToCheck, user) {
        const passwordHash = createHash(passwordToCheck + user.salt);

        if (passwordHash !== user.password) {
            throw new UnprocessableEntityError('Incorrect password');
        }

        try {
            const token = await asyncJwt.createToken({
                userId: user.id,
                email: user.email
            }, SECRET_TOKEN_KEY, '1m');

            return token;
        } catch (error) {
            throw new InternalServerError('Cannot create a token', error);
        }
    }
}

module.exports = new AuthenticationService();
