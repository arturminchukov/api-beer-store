const express = require('express');
const router = new express.Router();
const {beerController} = require('../controllers');

const getBeers = beerController.getBeers.bind(beerController);
const getBeer = beerController.getBeer.bind(beerController);

router.get('/:id', getBeer);
router.get('/', getBeers);

module.exports = router;
