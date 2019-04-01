const Sequelize = require('sequelize');

const userModel = {
    name: 'comment',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        brew_id: {
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
        tableName: 'comments'
    }
};

module.exports = userModel;
