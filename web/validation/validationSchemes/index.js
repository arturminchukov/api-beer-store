const beersValidationSchema = require('./beersValidationSchema');
const beerValidationSchema = require('./beerValidationSchema');
const brewValidationSchema = require('./brewValidationSchema');
const brewsValidationSchema = require('./brewsValidationSchema');
const addBrewValidationSchema = require('./addBrewValidationSchema');
const userAuthenticationSchema = require('./userLoginSchema');
const userRegistrationSchema = require('./userRegistrationSchema');

module.exports = {
    beersValidationSchema,
    beerValidationSchema,
    userAuthenticationSchema,
    userRegistrationSchema,
    brewValidationSchema,
    brewsValidationSchema,
    addBrewValidationSchema
};
