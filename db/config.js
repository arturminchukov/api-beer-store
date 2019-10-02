const config = require('config');

const DB_USERNAME = config.get('DB.USERNAME');
const DB_PASSWORD = config.get('DB.PASSWORD');
const DB_NAME = config.get('DB.NAME');
const DB_HOST = config.get('DB.HOST');

module.exports = {
    development: {
        driver: 'pg',
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'postgres'
    },
    production: {
        driver: 'pg',
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: 'postgres'
    }
};
