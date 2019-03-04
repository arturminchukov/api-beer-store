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
            type: Sequelize.STRING(512),
            validate: {
                isUrl: true
            }
        },
        salt: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    },
    options: {
        underscored: true,
        timestamps: true,
        tableName: 'users'
    }
};

module.exports = userModel;
