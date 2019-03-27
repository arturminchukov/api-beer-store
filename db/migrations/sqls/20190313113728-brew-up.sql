CREATE TABLE beer_types(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE brews(
    id SERIAL PRIMARY KEY,
    external_beer_id INTEGER NOT NUll,
    date INTEGER NOT NULL,
    location VARCHAR(512),
    ingredients JSON,
    brewing_method JSON,
    brew_name VARCHAR(128) NOT NULL,
    images_collection JSON,
    impressions TEXT,
    beer_type_id INTEGER NOT NULL REFERENCES beer_types(id) ON DELETE cascade,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);
