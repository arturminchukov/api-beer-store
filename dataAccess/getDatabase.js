const Sequelize = require('sequelize');
const config = require('config');

const DATABASE = config.get('DB.NAME');
const USERNAME = config.get('DB.USERNAME');
const PASSWORD = config.get('DB.PASSWORD');
const PORT = config.get('DB.PORT');
const HOST = config.get('DB.HOST');

const databaseInstance = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    dialect: 'postgres',
    host: HOST,
    port: PORT
});

module.exports = databaseInstance;
