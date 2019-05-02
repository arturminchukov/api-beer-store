const Sequelize = require('sequelize');
const config = require('config');
const {userModel, beerModel, userBeerModel, brewModel, beerTypeModel, commentModel} = require('./models');

const DATABASE = config.get('DB.NAME');
const USERNAME = config.get('DB.USERNAME');
const PASSWORD = config.get('DB.PASSWORD');
const PORT = config.get('DB.PORT');
const HOST = config.get('DB.HOST');

const models = [userModel, beerModel, userBeerModel, brewModel, beerTypeModel, commentModel];

const associateToMany = function (A, B, connectModel) {
    const {model: modelA, foreignKey: foreignKeyA} = A;
    const {model: modelB, foreignKey: foreignKeyB} = B;

    modelA.belongsToMany(modelB, {
        through: {
            model: connectModel,
            unique: false
        },
        foreignKey: foreignKeyA,
        constraints: false
    });

    modelB.belongsToMany(modelA, {
        through: {
            model: connectModel,
            unique: false
        },
        foreignKey: foreignKeyB,
        constraints: false
    });
};

const getSequelize = function (modelList) {
    const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
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
    const Comments = sequelize.models[commentModel.name];

    associateToMany({
        model: Users,
        foreignKey: 'user_id'
    }, {
        model: Beers,
        foreignKey: 'beer_id'
    }, UserBeers);

    Brews.hasMany(Comments, {
        foreignKey: 'brewId',
        constraints: false
    });

    Comments.belongsTo(Users, {
        foreignKey: 'userId',
        constraints: false
    });

    Comments.belongsTo(Brews, {
        foreignKey: 'brewId',
        constraints: false
    });


    Brews.belongsTo(BeerTypes, {
        foreignKey: 'beer_type_id',
        constraints: false
    });

    return sequelize;
};

module.exports = getSequelize(models);
