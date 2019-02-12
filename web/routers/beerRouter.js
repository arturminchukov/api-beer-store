const express = require('express');
const router = new express.Router();
const {beerController} = require('../controllers');

const getBeer = beerController.getBeer.bind(beerController);
const getBeers = beerController.getBeers.bind(beerController);

router.get('/:id', getBeer);
router.get('/', getBeers);

module.exports = router;
