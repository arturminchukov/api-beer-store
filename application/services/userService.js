const config = require('config');

const {UnprocessableEntityError, InternalServerError} = require('../../errors');
const {userRepository} = require('../../dataAccess/repositories');
const {createHash, asyncJwt} = require('../../helpers');

const SECRET_TOKEN_KEY = config.get('SECRET_TOKEN_KEY');

class UserService {
    async register(userModel) {
        const salt = this._generateSalt(userModel.password);
        const passwordHash = createHash(userModel.password + salt);

        const result = await userRepository.createUser({
            ...userModel,
            password: passwordHash,
            salt
        });

        return result;
    }

    async authenticate(email, password) {
        let user = null;

        try {
            user = await userRepository.getUser({
                email
            });
        } catch (error) {
            if (error.statusCode === 404) {
                throw new UnprocessableEntityError('Incorrect email');
            }

            throw error;
        }

        const passwordHash = createHash(password + user.salt);

        if (passwordHash !== user.password) {
            throw new UnprocessableEntityError('Incorrect password');
        }

        try {
            const token = await asyncJwt.createToken({
                userId: user.id,
                email
            }, SECRET_TOKEN_KEY);

            return token;
        } catch (error) {
            throw new InternalServerError('Cannot create a token');
        }
    }

    _generateSalt(password) {
        const randomNumber = Math.random() * 1000000;

        return createHash(password + Date.now() + randomNumber);
    }
}

module.exports = new UserService();
