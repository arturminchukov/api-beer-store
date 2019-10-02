const express = require('express');

const {beerTypeController} = require('../controllers');
const {expressRouterWrapper: routerWrapper} = require('../routerWrapper');
const {authenticationMiddleware} = require('../middlewares');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const router = new express.Router();
const {brewValidationSchema, brewsValidationSchema, addBeerTypeValidationSchema} = validationSchemes;
const {expressValidationMiddlewareFactory} = validationMiddlewareFactory;

const getBeerType = beerTypeController.getBeerType.bind(beerTypeController);
const getBeersTypes = beerTypeController.getBeersTypes.bind(beerTypeController);
const addBeerType = beerTypeController.addBeerType.bind(beerTypeController);

const middlewareBrewValidator = expressValidationMiddlewareFactory(brewValidationSchema);
const middlewareBrewsValidator = expressValidationMiddlewareFactory(brewsValidationSchema);
const middlewareAddBeerTypeValidator = expressValidationMiddlewareFactory(addBeerTypeValidationSchema);

router.get('/', authenticationMiddleware, middlewareBrewsValidator, routerWrapper(getBeersTypes));
router.get('/:id', authenticationMiddleware, middlewareBrewValidator, routerWrapper(getBeerType));
router.post('/', authenticationMiddleware, middlewareAddBeerTypeValidator, routerWrapper(addBeerType));

module.exports = router;
