const Sequelize = require('sequelize');

const userModel = {
    name: 'favorite',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        tagline: {
            type: Sequelize.STRING(128)
        },
        description: {
            type: Sequelize.TEXT
        },
        beer_image: {
            type: Sequelize.STRING(512),
            validate: {
                isUrl: true
            }
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
        tableName: 'favorites'
    }
};

module.exports = userModel;
