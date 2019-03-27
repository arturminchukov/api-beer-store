const express = require('express');

const {beerTypeController} = require('../controllers');
const routerWrapper = require('../routerWrapper');
const {authenticationMiddleware} = require('../middlewares');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const router = new express.Router();
const {brewValidationSchema, brewsValidationSchema, addBeerTypeValidationSchema} = validationSchemes;

const getBeerType = beerTypeController.getBeerType.bind(beerTypeController);
const getBeersTypes = beerTypeController.getBeersTypes.bind(beerTypeController);
const addBeerType = beerTypeController.addBeerType.bind(beerTypeController);

const middlewareBrewValidator = validationMiddlewareFactory(brewValidationSchema);
const middlewareBrewsValidator = validationMiddlewareFactory(brewsValidationSchema);
const middlewareAddBeerTypeValidator = validationMiddlewareFactory(addBeerTypeValidationSchema);

router.get('/', authenticationMiddleware, middlewareBrewsValidator, routerWrapper(getBeersTypes));
router.get('/:id', authenticationMiddleware, middlewareBrewValidator, routerWrapper(getBeerType));
router.post('/', authenticationMiddleware, middlewareAddBeerTypeValidator, routerWrapper(addBeerType));

module.exports = router;
