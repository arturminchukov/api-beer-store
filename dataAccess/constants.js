const SQL_ERRORS = {
    SequelizeConnectionRefusedError: 'SequelizeConnectionRefusedError',
    SequelizeUniqueConstraintError: 'SequelizeUniqueConstraintError',
    SequelizeValidationError: 'SequelizeValidationError'
};

const BEER_PREVIEW_INFO = ['id', 'name', 'tagline', 'description', 'image_url'];


module.exports = {
    SQL_ERRORS,
    BEER_PREVIEW_INFO
};
