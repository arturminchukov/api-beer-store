const express = require('express');

const {beerController} = require('../controllers');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');
const routerWrapper = require('../routerWrapper');

const router = new express.Router();
const {beerValidationSchema, beersValidationSchema} = validationSchemes;

const getBeer = beerController.getBeer.bind(beerController);
const getBeers = beerController.getBeers.bind(beerController);

const middlewareBeerValidator = validationMiddlewareFactory(beerValidationSchema);
const middlewareBeersValidator = validationMiddlewareFactory(beersValidationSchema);

router.get('/:id', middlewareBeerValidator, routerWrapper(getBeer));
router.get('/', middlewareBeersValidator, routerWrapper(getBeers));

module.exports = router;
