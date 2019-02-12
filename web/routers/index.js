const beersRouter = require('./beerRouter');

const configureRoutes = function (app) {
    app.use('/beers', beersRouter);
};

module.exports = configureRoutes;
