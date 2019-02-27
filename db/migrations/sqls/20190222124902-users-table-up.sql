CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    birthday INTEGER,
    image_url VARCHAR(512),
    salt VARCHAR(128) NOT NULL
);
