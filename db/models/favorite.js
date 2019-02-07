module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('FavoriteBeers', {
        api_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        tagline: DataTypes.STRING,
        description: DataTypes.STRING,
        image_url: DataTypes.STRING
    }, {});

    Favorite.associate = function (models) {
        Favorite.belongsToMany(models.Users, {through: 'UserFavorite',
            as: 'User'});
    };
    return Favorite;
};
