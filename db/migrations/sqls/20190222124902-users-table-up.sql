CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birthday DATE,
    image_url VARCHAR(200),
    salt VARCHAR(128) NOT NULL
);
