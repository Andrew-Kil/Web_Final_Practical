DROP DATABASE IF EXISTS earworm;
CREATE DATABASE earworm;

\c earworm;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL
);

CREATE TABLE genres
(
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE songs
(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    img_URL TEXT,
    user_id INT REFERENCES users(id),
    genre_id INT REFERENCES genres(id)
);

CREATE TABLE favorites
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    song_id INT REFERENCES songs(id)
);

CREATE TABLE COMMENTS
(
    id SERIAL PRIMARY KEY,
    comment_body TEXT,
    user_id INT REFERENCES users(id),
    song_id INT REFERENCES songs
)

-- Create an
-- .sql file to
-- create these tables and seed this database
-- with at least 10 users, 5 genres, 15 songs, 40 favorites, and 20 comments. Your first user should be your sample user - the user that we will automatically be logged-in as.