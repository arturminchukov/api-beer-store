const GetSequelize = require('sequelize');
const config = require('config');
const {userModel} = require('./models');

const DATABASE = config.get('DB.NAME');
const USERNAME = config.get('DB.USERNAME');
const PASSWORD = config.get('DB.PASSWORD');
const PORT = config.get('DB.PORT');
const HOST = config.get('DB.HOST');

const models = [userModel];

const getSequelize = function (modelList) {
    const sequelize = new GetSequelize(DATABASE, USERNAME, PASSWORD, {
        dialect: 'postgres',
        host: HOST,
        port: PORT
    });

    modelList.forEach((model) => {
        sequelize.models[model.name] = sequelize.define(model.name, model.attributes, model.options);
    });

    return sequelize;
};

module.exports = getSequelize(models);
