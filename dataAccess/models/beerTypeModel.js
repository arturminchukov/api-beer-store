const Sequelize = require('sequelize');

const beerTypeModel = {
    name: 'beerType',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(64),
            allowNull: false,
            unique: true
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
        tableName: 'beer_types'
    }
};

module.exports = beerTypeModel;
