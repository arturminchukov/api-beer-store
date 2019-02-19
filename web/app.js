const express = require('express');

const {configureHeader, configureParsers, configureErrorHandlers, configureRoutes, configureLogger, configureErrorLogger} = require('./appConfiguration');

const app = express();

configureHeader(app);
configureParsers(app);
configureLogger(app);
configureRoutes(app);
configureErrorLogger(app);
configureErrorHandlers(app);

module.exports = app;
