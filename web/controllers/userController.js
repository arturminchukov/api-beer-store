const {userService, authenticationService} = require('../../application/services');

class UserController {
    async register(req, res) {
        const userModel = req.body;

        await userService.addUser(userModel);
        res.status(204)
            .end();
    }

    async login(req, res) {
        const {email, password} = req.body;

        const token = await authenticationService.authenticateByCredentials(email, password);

        res.status(204)
            .set('x-Auth', token)
            .end();
    }
}

module.exports = new UserController();
