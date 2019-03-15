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
    ('song1', 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto', 1, 1),
    ('song2', 'https://fakeimg.pl/350x200/?text=Hello', 2, 2),
    ('song3', 'https://fakeimg.pl/350x200/?text=Goodbye', 3, 3),
    ('song4', 'https://fakeimg.pl/350x200/?text=cat', 4, 4),
    ('song5', 'https://fakeimg.pl/350x200/?text=hawk', 5, 5),
    ('song6', 'https://fakeimg.pl/350x200/?text=dog', 6, 1),
    ('song7', 'https://fakeimg.pl/350x200/?text=lion', 7, 2),
    ('song8', 'https://fakeimg.pl/350x200/?text=tiger', 8, 3),
    ('song9', 'https://fakeimg.pl/350x200/?text=shark', 9, 4),
    ('song10', 'https://fakeimg.pl/350x200/?text=whale', 10, 5),
    ('song11', 'https://fakeimg.pl/350x200/?text=lobster', 1, 1),
    ('song12', 'urhttps://fakeimg.pl/350x200/?text=cow', 2, 2),
    ('song13', 'https://fakeimg.pl/350x200/?text=bird', 3, 3),
    ('song14', 'https://fakeimg.pl/350x200/?text=chicken', 4, 4),
    ('song15', 'https://fakeimg.pl/350x200/?text=crow', 5, 5);

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
    (1, 2),
    (2, 2),
    (3, 3),
    (6, 3),
    (9, 3),
    (10, 3),
    (1, 4),
    (2, 4),
    (3, 4),
    (4, 4),
    (5, 4),
    (6, 4),
    (7, 4),
    (8, 4),
    (9, 4),
    (1, 4),
    (2, 4),
    (3, 4),
    (4, 4),
    (5, 4),
    (6, 4),
    (5, 5),
    (6, 6),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 7),
    (8, 8),
    (9, 9),
    (3, 9),
    (2, 10),
    (4, 10),
    (6, 10),
    (1, 11),
    (2, 11),
    (8, 11),
    (2, 12),
    (3, 13),
    (4, 14),
    (5, 15);

INSERT INTO comments
    (comment_body, user_id, song_id)
VALUES
    ('great song', 1, 1),
    ('bad song', 2, 3),
    ('i listen to this when i am sad', 3, 5),
    ('i listen to this when i am mad', 4, 2),
    ('i listen to this when i am glad', 5, 9),
    ('i listen to this when i am bad', 6, 10),
    ('this song gives me shivers', 7, 11),
    ('this song gives me goosebumps', 8, 12),
    ('i heard this song from the radio', 9, 15),
    ('i heard this song from the internet', 10, 14),
    ('i heard this song from the movie', 1, 13),
    ('will play this song at my wedding', 2, 7),
    ('will play this song at your funeral', 3, 9),
    ('will play this song at your graduation', 4, 11),
    ('what a waste of 3 minutes', 5, 1),
    ('what a great way to spend 3 minutes', 6, 6),
    ('this song changed my life', 7, 4),
    ('this song did not change my life', 8, 10),
    ('this song is awesome', 9, 15),
    ('first', 10, 1);