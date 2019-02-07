module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'UserFavorite',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                userId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
                    allowNull: false
                },
                favoriteId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Favorites',
                        key: 'id'
                    },
                    allowNull: false
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE,
            }
        );
    },
    down: queryInterface => queryInterface.dropTable('UserFavorite')
};
