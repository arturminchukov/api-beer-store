module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('FavoriteBeers', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        api_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        tagline: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }),
    down: queryInterface => queryInterface.dropTable('FavoriteBeers')
};
