const express = require('express');

const {beerController} = require('../controllers');
const {expressRouterWrapper: routerWrapper} = require('../routerWrapper');
const {authenticationMiddleware} = require('../middlewares');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const router = new express.Router();
const {beerValidationSchema, beersValidationSchema} = validationSchemes;
const {expressValidationMiddlewareFactory} = validationMiddlewareFactory;

const getBeer = beerController.getBeer.bind(beerController);
const getBeers = beerController.getBeers.bind(beerController);
const addToFavorite = beerController.addFavorite.bind(beerController);
const removeFromFavorite = beerController.removeFavorite.bind(beerController);

const middlewareBeerValidator = expressValidationMiddlewareFactory(beerValidationSchema);
const middlewareBeersValidator = expressValidationMiddlewareFactory(beersValidationSchema);

router.get('/', authenticationMiddleware, middlewareBeersValidator, routerWrapper(getBeers));
router.get('/:id', authenticationMiddleware, middlewareBeerValidator, routerWrapper(getBeer));
router.post('/:externalId/favorite', authenticationMiddleware, middlewareBeerValidator, routerWrapper(addToFavorite));
router.delete('/:externalId/favorite', authenticationMiddleware, middlewareBeerValidator, routerWrapper(removeFromFavorite));

module.exports = router;
