const configureRoutes = require('./routers');
const express = require('express');
const {configureHeader, configureParsers, configureErrorHandlers} = require('./appConfiguration');

const app = express();

configureHeader(app);
configureParsers(app);
configureRoutes(app);
configureErrorHandlers(app);

module.exports = app;
