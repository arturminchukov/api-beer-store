module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        birthday: DataTypes.DATE,
        image_url: DataTypes.STRING
    }, {});

    User.associate = function (models) {
        User.belongsToMany(models.FavoriteBeers, {
            through: 'UserFavorite',
            as: 'FavoriteBeers'
        });
    };

    return User;
};
