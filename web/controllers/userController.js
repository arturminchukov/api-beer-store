const {userService, authenticationService} = require('../../application/services');
const {AUTH_HEADER} = require('../constants');

class UserController {
    async register(req, res) {
        const userModel = req.body;

        await userService.addUser(userModel);
        res.status(204)
            .end();
    }

    async login(req, res) {
        const {email, password} = req.body;

        const {token} = await authenticationService.authenticateByCredentials(email, password);

        res.status(204)
            .set(AUTH_HEADER, token)
            .end();
    }
}

module.exports = new UserController();
