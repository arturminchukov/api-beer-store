const {userService} = require('../../application').services;

class BeerController {
    async register(req, res, next) {
        try {
            const userData = req.body;

            await userService.register(userData);
            res.status(204)
                .send();
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            console.log(email, password);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new BeerController();
