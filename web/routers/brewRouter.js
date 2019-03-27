const express = require('express');

const {brewController} = require('../controllers');
const routerWrapper = require('../routerWrapper');
const {authenticationMiddleware} = require('../middlewares');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const router = new express.Router();
const {brewValidationSchema, brewsValidationSchema, addBrewValidationSchema} = validationSchemes;

const getBrew = brewController.getBrew.bind(brewController);
const getBrews = brewController.getBrews.bind(brewController);
const addBrew = brewController.addBrew.bind(brewController);

const middlewareBrewValidator = validationMiddlewareFactory(brewValidationSchema);
const middlewareBrewsValidator = validationMiddlewareFactory(brewsValidationSchema);
const middlewareAddBrewValidator = validationMiddlewareFactory(addBrewValidationSchema);

router.get('/', authenticationMiddleware, middlewareBrewsValidator, routerWrapper(getBrews));
router.get('/:id', authenticationMiddleware, middlewareBrewValidator, routerWrapper(getBrew));
router.post('/', authenticationMiddleware, middlewareAddBrewValidator, routerWrapper(addBrew));

module.exports = router;
