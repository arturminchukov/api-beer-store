const Sequelize = require('sequelize');

const userModel = {
    name: 'user',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(64),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING(64)
        },
        firstName: {
            type: Sequelize.STRING(64),
            field: 'first_name'
        },
        lastName: {
            type: Sequelize.STRING(64),
            field: 'last_name'
        },
        birthday: {
            type: Sequelize.DATEONLY
        },
        imageUrl: {
            type: Sequelize.STRING(512),
            validate: {
                isUrl: true
            },
            field: 'image_url'
        },
        salt: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            field: 'updated_at'
        }
    },
    options: {
        timestamps: true,
        tableName: 'users'
    }
};

module.exports = userModel;
