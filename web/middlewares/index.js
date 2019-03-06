const authenticationMiddleware = require('./authenticationMiddleware');
const errorHandleMiddleware = require('./errorHandleMiddleware');
const errorLogMiddleware = require('./errorLogMiddleware');

module.exports = {
    authenticationMiddleware,
    errorHandleMiddleware,
    errorLogMiddleware
};
