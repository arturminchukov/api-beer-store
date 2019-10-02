CREATE INDEX idx_comment_user ON comments(user_id);
CREATE INDEX idx_comment_brew ON comments(brew_id);

CREATE INDEX idx_user_beers_user_id ON user_beers(user_id);
CREATE INDEX idx_user_beers_beer_id ON user_beers(beer_id);
