const express = require('express');
const router = new express.Router();
const {beerController} = require('../controllers');
const validator = require('../validator');
const {BEER_VALIDATION_SCHEMA, BEERS_VALIDATION_SCHEMA} = require('../constants');

const getBeers = beerController.getBeers.bind(beerController);
const getBeer = beerController.getBeer.bind(beerController);

const beerValidator = validator.getValidator(BEER_VALIDATION_SCHEMA, {
    coerceTypes: true,
    allErrors: true
});

const beersValidator = validator.getValidator(BEERS_VALIDATION_SCHEMA, {
    coerceTypes: true,
    allErrors: true,
    removeAdditional: true,
    useDefaults: true
});

router.get('/:id', beerValidator, getBeer);

router.get('/', beersValidator, getBeers);

module.exports = router;
