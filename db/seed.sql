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
    img_url TEXT,
    user_id INT REFERENCES users(id),
    genre_id INT REFERENCES genres(id)
);

CREATE TABLE favorites
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    song_id INT REFERENCES songs(id)
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    comment_body TEXT,
    user_id INT REFERENCES users(id),
    song_id INT REFERENCES songs
);

INSERT INTO users
    (username)
VALUES
    ('dannyDeVito'),
    ('charlieKelly'),
    ('bobBelcher'),
    ('lindaBelcher'),
    ('homerSimpson'),
    ('margeSimpson'),
    ('jimHalpert'),
    ('pamBeasly'),
    ('barackObama'),
    ('michelleObama');

INSERT INTO genres
    (genre_name)
VALUES
    ('Hip-Hop'),
    ('Rock'),
    ('Pop'),
    ('Chill'),
    ('Electronic');

INSERT INTO songs
    (title, img_url, user_id, genre_id)
VALUES
    ('song1', 'url1', 1, 1),
    ('song2', 'url2', 2, 2),
    ('song3', 'url3', 3, 3),
    ('song4', 'url4', 4, 4),
    ('song5', 'url5', 5, 5),
    ('song6', 'url6', 6, 1),
    ('song7', 'url7', 7, 2),
    ('song8', 'url8', 8, 3),
    ('song9', 'url9', 9, 4),
    ('song10', 'url10', 10, 5),
    ('song11', 'url11', 1, 1),
    ('song12', 'url12', 2, 2),
    ('song13', 'url13', 3, 3),
    ('song14', 'url14', 4, 4),
    ('song15', 'url15', 5, 5);

INSERT INTO favorites
    (user_id, song_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (2, 2),
    (4, 2),
    (6, 2),
    (8, 2),
    (10, 2),
    (12, 2),
    (14, 2),
    (3, 3),
    (6, 3),
    (9, 3),
    (12, 3),
    (15, 3),
    (1, 4),
    (2, 4),
    (3, 4),
    (4, 4),
    (5, 5),
    (6, 6),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (1, 11),
    (2, 12),
    (3, 13),
    (4, 14),
    (5, 15)
,
