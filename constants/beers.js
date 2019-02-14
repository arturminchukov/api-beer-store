const MAP_PARAMS = {
    page: 'page',
    perPage: 'per_page',
    beerName: 'beer_name',
    abvGt: 'abv_gt',
    abvLt: 'abv_lt',
    ibuGt: 'ibu_gt',
    ibuLt: 'ibu_lt',
    ebcGt: 'ebc_gt',
    ebcLt: 'ebc_lt'
};

module.exports = {
    VALID_PAGE_PARAMS: ['page', 'perPage'],
    VALID_FILTER_PARAMS: ['beerName', 'abvGt', 'abvLt', 'ibuGt', 'ibuLt', 'ebcGt', 'ebcLt'],
    DEFAULT_PAGE: 1,
    DEFAULT_PER_PAGE: 25,
    MAP_PARAMS
};
