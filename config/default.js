module.exports = {
    DB: {
        HOST: 'localhost',
        PORT: 5432,
        NAME: 'beer_store',
        USERNAME: 'postgres'
    },
    SERVER: {
        PORT: 3030
    },
    WEBSOCKET: {
        PING_TIMEOUT: 5000,
        PING_INTERVAL: 10000,
        COOKIES: false
    },
    EXTERNAL_RESOURCES: {
        API_URL: 'https://api.punkapi.com/v2'
    },
    LOGGER: {
        DEFAULT_LEVEL: 'info',
        MAX_TIME_FILES_STORE: '1d'
    },
    DEBUG: true,
    TOKEN_LIFE_TIME: '1h'
};
