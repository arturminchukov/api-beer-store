const express = require('express');
const router = new express.Router();
const {beerController} = require('../controllers');

const handleBeers = beerController.handleBeers.bind(beerController);
const handleBeer = beerController.handleBeer.bind(beerController);

router.get('/:id', handleBeer);
router.get('/', handleBeers);

module.exports = router;
