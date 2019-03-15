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
    ('Hey Jude', 'https://charts-static.billboard.com/img/1968/09/the-beatles-ism-174x174.jpg', 1, 1),
    ('Eye Of The Tiger', 'https://charts-static.billboard.com/img/1982/06/survivor-yca-106x106.jpg', 2, 2),
    ('Rolling In The Deep', 'https://charts-static.billboard.com/img/2010/12/adele-hdy-174x174.jpg', 3, 3),
    ('Lets Get It On', 'https://charts-static.billboard.com/img/1973/07/marvin-gaye-s2l-174x174.jpg', 4, 4),
    ('Another One Bites The Dust', 'https://charts-static.billboard.com/img/1980/08/queen-m21-174x174.jpg', 5, 5),
    ('End Of The Road', 'https://charts-static.billboard.com/img/1992/07/boyz-ii-men-iur-174x174.jpg', 6, 1),
    ('Gold Digger', 'https://charts-static.billboard.com/img/2005/07/kanye-west-irm-106x106.jpg', 7, 2),
    ('Billie Jean', 'https://charts-static.billboard.com/img/1983/01/michael-jackson-9to-174x174.jpg', 8, 3),
    ('I Gotta Feeling', 'https://charts-static.billboard.com/img/2009/06/the-black-eyed-peas-b9u-174x174.jpg', 9, 4),
    ('We Found Love', 'https://charts-static.billboard.com/img/2011/10/rihanna-v3t-174x174.jpg', 10, 5),
    ('Every Breath You Take', 'https://charts-static.billboard.com/img/1983/06/the-police-yho-106x106.jpg', 1, 1),
    ('Night Fever', 'https://charts-static.billboard.com/img/1978/02/bee-gees-uc7-174x174.jpg', 2, 2),
    ('Call Me Maybe', 'https://charts-static.billboard.com/img/2011/10/carly-rae-jepsen-hod-174x174.jpg', 3, 3),
    ('I Will Always Love You', 'https://charts-static.billboard.com/img/1992/11/whitney-houston-m52-174x174.jpg', 4, 4),
    ('Let Me Love You', 'https://charts-static.billboard.com/img/2004/10/mario-bu9-106x106.jpg', 5, 5);

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