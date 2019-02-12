const configureRoutes = require('./routers');
const express = require('express');
const {configureHeader, configureParsers} = require('./appConfiguration');

const app = express();

configureHeader(app);
configureParsers(app);
configureRoutes(app);

module.exports = app;
