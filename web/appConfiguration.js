const bodyParser = require('body-parser');
const {errorController} = require('./controllers');

const configureParsers = function (app) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
};

const configureHeader = function (app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
};

const configureErrorHandlers = function (app) {
    app.use(errorController.logError);
    app.use(errorController.errorHandler);
};

module.exports = {
    configureParsers,
    configureHeader,
    configureErrorHandlers
};
