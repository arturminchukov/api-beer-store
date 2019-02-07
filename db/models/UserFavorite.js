
module.exports = (sequelize, DataTypes) => {
    const FavoriteBeers = sequelize.define('FavoriteBeers', {
        id: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        favoriteBeerId: DataTypes.INTEGER,
    }, {});

    return FavoriteBeers;
};
