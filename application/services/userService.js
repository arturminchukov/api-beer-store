const {userRepository} = require('../../dataAccess/repositories');
const crypto = require('crypto');

class UserService {
    async register(userModel) {
        const salt = this._generateSalt(userModel.password);
        const passwordHash = this._createHash(userModel.password + salt);

        const result = await userRepository.createUser({
            ...userModel,
            password: passwordHash,
            salt
        });

        return result;
    }

    /*TODO: write code for login function*/
    login(email, password) {}

    _generateSalt(password) {
        return this._createHash(password + Date.now());
    }

    _createHash(str) {
        return crypto
            .createHash('sha256')
            .update(str)
            .digest('hex');
    }
}

module.exports = new UserService();
