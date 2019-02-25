const Sequelize = require('sequelize');
const databaseInstance = require('../getDatabase');

const {mapProperties} = require('../../helpers');
const {MAP_APPLICATION_PROPERTIES_TO_DATABASE, MAP_DATABASE_PROPERTIES_TO_APPLICATION} = require('../constants');
const {FailedDependencyError, InternalServerError, NotFoundError} = require('../../errors');

class UserRepository {
    constructor() {
        this.model = databaseInstance.define('user', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING(64),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(64)
            },
            first_name: {
                type: Sequelize.STRING(64)
            },
            last_name: {
                type: Sequelize.STRING(64)
            },
            birthday: {
                type: Sequelize.DATEONLY
            },
            image_url: {
                type: Sequelize.STRING(512)
            },
            salt: {
                type: Sequelize.STRING(128),
                allowNull: false
            }
        }, {
            underscored: true,
            timestamps: false
        });
    }

    getUserByEmail(email) {
        return this.getUser({email});
    }

    async getUser(options) {
        const validOptions = mapProperties(options, MAP_APPLICATION_PROPERTIES_TO_DATABASE);
        let result = null;

        try {
            result = await this.model.findOne({
                where: validOptions,
                attributes: ['id', 'email', 'first_name', 'last_name', 'birthday', 'image_url']
            });
        } catch (error) {
            if (error.statusCode >= 500) {
                throw new FailedDependencyError('Database not response', error);
            } else if (error.statusCode === 404) {
                throw new NotFoundError('The user was not found', error);
            } else {
                console.log(error);
                throw new InternalServerError('Error in connection to database', error);
            }
        }

        if (!result) {
            throw new NotFoundError('The user was not found');
        }

        result = mapProperties(result.dataValues, MAP_DATABASE_PROPERTIES_TO_APPLICATION);

        return result;
    }

    async createUser(user) {
        const userProperties = mapProperties(user, MAP_APPLICATION_PROPERTIES_TO_DATABASE);

        try {
            const result = await this.model.create(userProperties);

            return result;
        } catch (error) {
            if (error.statusCode >= 500) {
                throw new FailedDependencyError('Database not response', error);
            } else {
                throw new InternalServerError('Error in connection to database', error);
            }

        }
    }

}

module.exports = new UserRepository();
