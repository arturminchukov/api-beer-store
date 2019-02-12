module.exports = {
    db: {
        host: 'localhost',
        port: 5432,
        dbName: 'beer_store',
        username: process.env.DB_USERNAME || 'postgres'
    },
    server: {
        port: process.env.SERVER_PORT || 3030
    },
    constants: {
        apiUrl: 'https://api.punkapi.com/v2',
        validParams: ['page', 'per_page', 'order_property', 'sort_order'],
        validFilterParams: ['beer_name', 'abv_gt', 'abv_lt', 'ibu_gt', 'ibu_lt', 'ebc_gt', 'ebc_lt']
    }
};
