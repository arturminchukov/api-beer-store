const {revertMap} = require('../helpers');

const MAP_FILTER_PARAMS = {
    beerName: 'beer_name',
    alcoholByVolumeGreat: 'abv_gt',
    alcoholByVolumeLess: 'abv_lt',
    internationalBitternessUnitsGreat: 'ibu_gt',
    internationalBitternessUnitsLess: 'ibu_lt',
    colorEbcGreat: 'ebc_gt',
    colorEbcLess: 'ebc_lt'
};

const MAP_PAGE_PARAMS = {
    pageNumber: 'page',
    pageSize: 'per_page'
};

const MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE = {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'first_name',
    lastName: 'last_name',
    birthday: 'birthday',
    imageUrl: 'image_url',
    salt: 'salt'
};

const MAP_USER_DATABASE_PROPERTIES_TO_APPLICATION = revertMap(MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE);

module.exports = {
    MAP_FILTER_PARAMS,
    MAP_PAGE_PARAMS,
    MAP_USER_APPLICATION_PROPERTIES_TO_DATABASE,
    MAP_USER_DATABASE_PROPERTIES_TO_APPLICATION
};
