const express = require('express');

const {brewController} = require('../controllers');
const {expressRouterWrapper: routerWrapper} = require('../routerWrapper');
const {authenticationMiddleware} = require('../middlewares');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const router = new express.Router();
const {brewValidationSchema, brewsValidationSchema, addBrewValidationSchema} = validationSchemes;
const {expressValidationMiddlewareFactory} = validationMiddlewareFactory;

const getBrew = brewController.getBrew.bind(brewController);
const getBrews = brewController.getBrews.bind(brewController);
const addBrew = brewController.addBrew.bind(brewController);

const middlewareBrewValidator = expressValidationMiddlewareFactory(brewValidationSchema);
const middlewareBrewsValidator = expressValidationMiddlewareFactory(brewsValidationSchema);
const middlewareAddBrewValidator = expressValidationMiddlewareFactory(addBrewValidationSchema);

router.get('/', authenticationMiddleware, middlewareBrewsValidator, routerWrapper(getBrews));
router.get('/:id', authenticationMiddleware, middlewareBrewValidator, routerWrapper(getBrew));
router.post('/', authenticationMiddleware, middlewareAddBrewValidator, routerWrapper(addBrew));

module.exports = router;
