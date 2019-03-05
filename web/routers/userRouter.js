const express = require('express');

const {userController} = require('../controllers');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');
const routerWrapper = require('../routerWrapper');

const router = new express.Router();
const {userAuthenticationSchema, userRegistrationSchema} = validationSchemes;

const middlewareRegistrationValidator = validationMiddlewareFactory(userRegistrationSchema);
const middlewareAuthenticationValidator = validationMiddlewareFactory(userAuthenticationSchema);

router.post('/register', middlewareRegistrationValidator, routerWrapper(userController.register));
router.post('/login', middlewareAuthenticationValidator, routerWrapper(userController.login));

module.exports = router;
