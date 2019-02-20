const express = require('express');
const router = new express.Router();
const {beerController} = require('../controllers');
const {validatorFactory, validationSchemes} = require('../validation');

const {BEER_VALIDATION_SCHEMA, BEERS_VALIDATION_SCHEMA} = validationSchemes.beerValidationSchemes;

const getBeer = beerController.getBeer.bind(beerController);
const getBeers = beerController.getBeers.bind(beerController);

const middlewareBeerValidator = validatorFactory.getValidator(BEER_VALIDATION_SCHEMA);
const middlewareBeersValidator = validatorFactory.getValidator(BEERS_VALIDATION_SCHEMA);

router.get('/:id', middlewareBeerValidator, getBeer);
router.get('/', middlewareBeersValidator, getBeers);

module.exports = router;
