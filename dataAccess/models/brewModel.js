const Sequelize = require('sequelize');

const userModel = {
    name: 'brew',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        externalBeerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'external_beer_id'
        },
        date: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING(512)
        },
        ingredients: {
            type: Sequelize.TEXT
        },
        brewingMethod: {
            type: Sequelize.TEXT,
            field: 'brewing_method'
        },
        brewName: {
            type: Sequelize.STRING(128),
            allowNull: false,
            field: 'brew_name'
        },
        imagesCollection: {
            type: Sequelize.TEXT,
            field: 'images_collection'
        },
        impressions: {
            type: Sequelize.TEXT
        },
        beerTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'beer_type_id'
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
        tableName: 'brews'
    }
};

module.exports = userModel;
