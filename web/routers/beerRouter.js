const express = require('express');
const router = new express.Router();
const {beerController} = require('../controllers');

const getBeers = beerController.getBeers.bind(beerController);

router.get('/:id', beerController.getBeer);
router.get('/', getBeers);

module.exports = router;
