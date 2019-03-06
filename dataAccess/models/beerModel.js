const Sequelize = require('sequelize');

const userModel = {
    name: 'beer',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        foreign_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        tagline: {
            type: Sequelize.STRING(128)
        },
        description: {
            type: Sequelize.TEXT
        },
        image_url: {
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
        tableName: 'beers'
    }
};

module.exports = userModel;
