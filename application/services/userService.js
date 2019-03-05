const {userRepository} = require('../../dataAccess/repositories');
const {createHash} = require('../../helpers');

class UserService {
    async addUser(userModel) {
        const salt = this._generateSalt(userModel.password);
        const passwordHash = createHash(userModel.password + salt);

        const user = await userRepository.createUser({
            ...userModel,
            password: passwordHash,
            salt
        });

        return user;
    }

    getUserByEmail(email) {
        return userRepository.getUser({
            email
        });
    }

    _generateSalt(password) {
        const randomNumber = Math.random() * 1000000;

        return createHash(password + Date.now() + randomNumber);
    }
}

module.exports = new UserService();
