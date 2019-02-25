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

const MAP_APPLICATION_PROPERTIES_TO_DATABASE = {
    email: 'email',
    password: 'password',
    firstName: 'first_name',
    lastName: 'last_name',
    birthday: 'birthday',
    imageUrl: 'image_url',
    salt: 'salt'
};

const MAP_DATABASE_PROPERTIES_TO_APPLICATION = (function () {
    const keys = Object.keys(MAP_APPLICATION_PROPERTIES_TO_DATABASE);
    const result = {};

    keys.forEach((key) => {
        result[MAP_APPLICATION_PROPERTIES_TO_DATABASE[key]] = key;
    });

    return result;
}());

module.exports = {
    MAP_FILTER_PARAMS,
    MAP_PAGE_PARAMS,
    MAP_APPLICATION_PROPERTIES_TO_DATABASE,
    MAP_DATABASE_PROPERTIES_TO_APPLICATION
};
