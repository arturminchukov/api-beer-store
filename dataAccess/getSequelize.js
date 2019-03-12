const GetSequelize = require('sequelize');
const config = require('config');
const {userModel, beerModel, userBeerModel} = require('./models');

const DATABASE = config.get('DB.NAME');
const USERNAME = config.get('DB.USERNAME');
const PASSWORD = config.get('DB.PASSWORD');
const PORT = config.get('DB.PORT');
const HOST = config.get('DB.HOST');

const models = [userModel, beerModel, userBeerModel];

const getSequelize = function (modelList) {
    const sequelize = new GetSequelize(DATABASE, USERNAME, PASSWORD, {
        dialect: 'postgres',
        host: HOST,
        port: PORT
    });

    modelList.forEach((model) => {
        sequelize.define(model.name, model.attributes, model.options);
    });

    const User = sequelize.models[userModel.name];
    const Favorites = sequelize.models[beerModel.name];
    const UserFavorites = sequelize.models[userBeerModel.name];

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
        foreignKey: 'beer_id',
        constraints: false
    });

    return sequelize;
};

module.exports = getSequelize(models);
