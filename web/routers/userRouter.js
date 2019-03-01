const express = require('express');

const {userController} = require('../controllers');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');
const routerWrapper = require('../routerWrapper');

const router = new express.Router();
const {USER_AUTHENTICATION_VALIDATION_SCHEMA, USER_REGISTRATION_VALIDATION_SCHEMA} = validationSchemes.userValidationSchemes;

const middlewareRegistrationValidator = validationMiddlewareFactory(USER_REGISTRATION_VALIDATION_SCHEMA);
const middlewareAuthenticationValidator = validationMiddlewareFactory(USER_AUTHENTICATION_VALIDATION_SCHEMA);

router.post('/register', middlewareRegistrationValidator, routerWrapper(userController.register));
router.post('/login', middlewareAuthenticationValidator, routerWrapper(userController.login));

module.exports = router;
