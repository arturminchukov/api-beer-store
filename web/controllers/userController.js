const {userService} = require('../../application/services');

class UserController {
    async register(req, res, next) {
        try {
            const userModel = req.body;

            await userService.register(userModel);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    /*TODO: write code for login route*/
    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            console.log(email, password);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new UserController();
