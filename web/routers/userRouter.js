const express = require('express');
const router = new express.Router();
const {userController} = require('../controllers');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const {USER_VALIDATION_SCHEMA} = validationSchemes.userValidationSchemes;

const middlewareUserValidator = validationMiddlewareFactory(USER_VALIDATION_SCHEMA);

router.post('/login', middlewareUserValidator, userController.login);
router.post('/register', middlewareUserValidator, userController.register);

module.exports = router;
