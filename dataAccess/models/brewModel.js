const Sequelize = require('sequelize');

const userModel = {
    name: 'brew',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        external_beer_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING(512)
        },
        ingredients: {
            type: Sequelize.TEXT
        },
        brewing_method: {
            type: Sequelize.TEXT
        },
        brew_name: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        images_collection: {
            type: Sequelize.TEXT
        },
        impressions: {
            type: Sequelize.TEXT
        },
        beer_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        beer_id: {
            type: Sequelize.INTEGER,
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
        tableName: 'brews'
    }
};

module.exports = userModel;
