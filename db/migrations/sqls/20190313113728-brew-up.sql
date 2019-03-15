CREATE TABLE brews (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    location VARCHAR(128),
    ingredients TEXT,
    brewing_method TEXT,
    brew_name VARCHAR(128) NOT NULL,
    images_collection TEXT,
    impressions TEXT,
    beer_type_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
)

CREATE TABLE beer_type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
)
