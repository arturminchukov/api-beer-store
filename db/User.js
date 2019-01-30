const Sequelize = require('sequelize');

class User {
    /**
     * @param {Model} userModel
     * @param {Model} passwordModel
     */
    constructor(userModel, passwordModel) {
        this.user = userModel;
        this.password = passwordModel;
    }

    /**
     * @param {{login: string, password: string}} user
     */
    async addNewUser(user) {
        if (!user.login || !user.password) {
            console.log('No login or password property in user object');
            return;
        }

        const isFreeLogin = await this.isFreeLogin(user.login);

        if (!isFreeLogin) {
            return 'Such login already exist';
        }

        try {
            await this.user.sync();

            const result = await this.user.create({
                login: user.login,
                password: {
                    password: user.password,
                }
            }, {
                include: [{
                    association: this.user.password,
                }]
            });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * @param {String} login
     *
     * @return {Boolean}
     */
    async isFreeLogin(login) {
        if (!login) {
            return;
        }

        try {
            await this.user.sync();
            const result = await this.user.find({
                where: {
                    login,
                },
            });

            return !Boolean(result);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @param {{login: string, password: string}} user
     */
    async find(user) {
        if (!user.login || !user.password) {
            console.log('No login or password property in user object');
            return false;
        }

        const result = await this.user.sync()
            .then(() => this.user.findOne({
                where: user,
            }))
            .catch(e => console.log(e));

        return result;
    }

    /**
     * @param {{login: string, password: string}} user
     *
     * @return {boolean}
     */
    async check(user) {
        const result = await this.find(user);

        return Boolean(result);
    }

    /**
     * @param {string} login
     */
    async delete(login) {
        if (!login) {
            console.log('No such user');
            return false;
        }

        const result = await this.user.destroy({
            where: {
                login,
            },
        });

        return Boolean(result);
    }
}

module.exports = User;
