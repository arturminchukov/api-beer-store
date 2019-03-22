const GetSequelize = require('sequelize');
const config = require('config');
const {userModel, beerModel, userBeerModel, brewModel, beerTypeModel} = require('./models');

const DATABASE = config.get('DB.NAME');
const USERNAME = config.get('DB.USERNAME');
const PASSWORD = config.get('DB.PASSWORD');
const PORT = config.get('DB.PORT');
const HOST = config.get('DB.HOST');

const models = [userModel, beerModel, userBeerModel, brewModel, beerTypeModel];

const getSequelize = function (modelList) {
    const sequelize = new GetSequelize(DATABASE, USERNAME, PASSWORD, {
        dialect: 'postgres',
        host: HOST,
        port: PORT
    });

    modelList.forEach((model) => {
        sequelize.define(model.name, model.attributes, model.options);
    });

    const Users = sequelize.models[userModel.name];
    const Beers = sequelize.models[beerModel.name];
    const Brews = sequelize.models[brewModel.name];
    const BeerTypes = sequelize.models[beerTypeModel.name];
    const UserBeers = sequelize.models[userBeerModel.name];

    Users.belongsToMany(Beers, {
        through: {
            model: UserBeers,
            unique: false
        },
        foreignKey: 'user_id',
        constraints: false
    });

    Beers.belongsToMany(Users, {
        through: {
            model: UserBeers,
            unique: false
        },
        foreignKey: 'beer_id',
        constraints: false
    });

    BeerTypes.hasMany(Brews, {
        foreignKey: 'beer_type_id',
        constraints: false
    });

    return sequelize;
};

module.exports = getSequelize(models);
