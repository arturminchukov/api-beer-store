const {userService, authenticationService} = require('../../application/services');

class UserController {
    async addUser(req, res) {
        const userModel = req.body;

        await userService.addUser(userModel);
        res.status(204)
            .end();
    }

    async login(req, res) {
        const {email, password} = req.body;

        const user = await userService.getUserByEmail(email);
        const token = await authenticationService.authenticate(password, user);

        res.status(204)
            .set('x-Auth', token)
            .end();
    }
}

module.exports = new UserController();
