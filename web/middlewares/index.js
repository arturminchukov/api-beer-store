const authenticationMiddleware = require('./authenticationMiddleware');
const errorHandleMiddleware = require('./errorHandleMiddleware');
const errorLogMiddleware = require('./errorLogMiddleware');
const socketAuthenticationMiddleware = require('./socketAuthenticationMiddleware');
const socketErrorHandleMiddleware = require('./socketErrorHandleMiddleware');

module.exports = {
    authenticationMiddleware,
    errorHandleMiddleware,
    errorLogMiddleware,
    socketAuthenticationMiddleware,
    socketErrorHandleMiddleware
};
