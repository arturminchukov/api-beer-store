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

const MAP_BEER_APPLICATION_PROPERTIES_TO_DATABASE = {
    id: 'external_id',
    name: 'name',
    tagline: 'tagline',
    description: 'description',
    image_url: 'image_url'
};

const MAP_BEER_DATABASE_PROPERTIES_TO_APLLICATION = revertMap(MAP_BEER_APPLICATION_PROPERTIES_TO_DATABASE);

const MAP_BREW_APPLICATION_PROPERTIES_TO_DATABASE = {
    id: 'id',
    externalBeerId: 'externalBeerId',
    date: 'date',
    location: 'location',
    ingredients: 'ingredients',
    brewingMethod: 'brewingMethod',
    brewName: 'brewName',
    imagesCollection: 'imagesCollection',
    impressions: 'impressions',
    'beer_type.name': 'beerType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};

module.exports = {
    MAP_FILTER_PARAMS,
    MAP_PAGE_PARAMS,
    MAP_BEER_APPLICATION_PROPERTIES_TO_DATABASE,
    MAP_BEER_DATABASE_PROPERTIES_TO_APLLICATION,
    MAP_BREW_APPLICATION_PROPERTIES_TO_DATABASE
};
