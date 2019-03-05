const beersValidationSchema = require('./beersValidationSchema');
const beerValidationSchema = require('./beerValidationSchema');
const userAuthenticationSchema = require('./userLoginSchema');
const userRegistrationSchema = require('./userRegistrationSchema');

module.exports = {
    beersValidationSchema,
    beerValidationSchema,
    userAuthenticationSchema,
    userRegistrationSchema
};
