const {userService} = require('../../application/services');

class UserController {
    async register(req, res) {
        const userModel = req.body;

        await userService.register(userModel);
        res.status(204)
            .send();
    }

    async login(req, res) {
        const {email, password} = req.body;

        const token = await userService.authenticate(email, password);

        res.status(204)
            .set('x-Auth', token)
            .send();
    }
}

module.exports = new UserController();
