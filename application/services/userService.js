const {userRepository} = require('../../dataAccess').repositories;
const {UnprocessableEntityError} = require('../../errors');
const cryptoRandomString = require('crypto-random-string');
const hash = require('hash.js');

const {SALT_LENGTH} = require('../constants');

class UserService {
    async register(userData) {
        const isFreeEmail = await this._isFreeEmail(userData.email);
        const filteredData = this._filterData(userData);

        if (!isFreeEmail) {
            throw new UnprocessableEntityError('Such email already exist');
        }

        const salt = this._generateSalt();
        const passwordHash = this._createHash(userData.password, salt);

        const result = await userRepository.createUser({
            ...filteredData,
            password: passwordHash,
            salt
        });

        return result;
    }

    login(email, password) {

    }

    _filterData(data) {
        const dataCopy = Object.assign(data, {});
        const keys = Object.keys(dataCopy);

        keys.forEach((key) => {
            if (!dataCopy[key]) {
                Reflect.deleteProperty(dataCopy, key);
            }
        });

        return dataCopy;
    }

    async _isFreeEmail(email) {
        try {
            const user = await userRepository.getUserByEmail(email);

            return Boolean(!user);
        } catch (error) {
            if (error.statusCode === 404) {
                return true;
            }

            throw error;
        }
    }

    _generateSalt() {
        return cryptoRandomString(SALT_LENGTH);
    }

    _createHash(password, salt) {
        return hash.sha256()
            .update(password + salt)
            .digest('hex');
    }
}

module.exports = new UserService();
