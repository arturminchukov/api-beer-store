const express = require('express');
const router = new express.Router();
const {beerController} = require('../controllers');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const {BEER_VALIDATION_SCHEMA, BEERS_VALIDATION_SCHEMA} = validationSchemes.beerValidationSchemes;

const getBeer = beerController.getBeer.bind(beerController);
const getBeers = beerController.getBeers.bind(beerController);

const middlewareBeerValidator = validationMiddlewareFactory(BEER_VALIDATION_SCHEMA);
const middlewareBeersValidator = validationMiddlewareFactory(BEERS_VALIDATION_SCHEMA);

router.get('/:id', middlewareBeerValidator, getBeer);
router.get('/', middlewareBeersValidator, getBeers);

module.exports = router;
