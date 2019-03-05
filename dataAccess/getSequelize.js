const GetSequelize = require('sequelize');
const config = require('config');
const {userModel, favoriteModel, userFavoritesModel} = require('./models');

const DATABASE = config.get('DB.NAME');
const USERNAME = config.get('DB.USERNAME');
const PASSWORD = config.get('DB.PASSWORD');
const PORT = config.get('DB.PORT');
const HOST = config.get('DB.HOST');

const models = [userModel, favoriteModel, userFavoritesModel];

const getSequelize = function (modelList) {
    const sequelize = new GetSequelize(DATABASE, USERNAME, PASSWORD, {
        dialect: 'postgres',
        host: HOST,
        port: PORT
    });

    modelList.forEach((model) => {
        sequelize.models[model.name] = sequelize.define(model.name, model.attributes, model.options);
    });

    const User = sequelize.models[userModel.name];
    const Favorites = sequelize.models[favoriteModel.name];
    const UserFavorites = sequelize.models[userFavoritesModel.name];

    User.belongsToMany(Favorites, {
        through: {
            model: UserFavorites,
            unique: false
        },
        foreignKey: 'user_id',
        constraints: false
    });

    Favorites.belongsToMany(User, {
        through: {
            model: UserFavorites,
            unique: false
        },
        foreignKey: 'favorite_id',
        constraints: false
    });

    return sequelize;
};

module.exports = getSequelize(models);
