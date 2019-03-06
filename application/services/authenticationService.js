const config = require('config');

const {createHash, asyncJwt} = require('../../helpers');
const {UnprocessableEntityError, NotFoundError, UnauthorizedError} = require('../../errors');
const userService = require('./userService');

const SECRET_TOKEN_KEY = config.get('SECRET_TOKEN_KEY');
const TOKEN_LIFE_TIME = config.get('TOKEN_LIFE_TIME');

class AuthenticationService {
    async authenticateByCredentials(email, password) {
        let user = null;

        try {
            user = await userService.getUserByEmail(email);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new UnprocessableEntityError('Incorrect email');
            }

            throw error;
        }

        const passwordHash = createHash(password + user.salt);

        if (passwordHash !== user.password) {
            throw new UnprocessableEntityError('Incorrect password');
        }

        return asyncJwt.createToken({
            userId: user.id,
            email: user.email
        }, SECRET_TOKEN_KEY, TOKEN_LIFE_TIME);
    }

    async authenticateByToken(token) {
        let decodedData = null;

        try {
            decodedData = await asyncJwt.verifyToken(token, SECRET_TOKEN_KEY);
        } catch (error) {
            throw new UnauthorizedError('Invalid token', error);
        }

        const {email, userId} = decodedData;

        const updatedToken = asyncJwt.createToken({
            userId,
            email
        }, SECRET_TOKEN_KEY, TOKEN_LIFE_TIME);

        return {
            updatedToken,
            userId
        };
    }
}

module.exports = new AuthenticationService();
