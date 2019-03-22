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
    ('Electronic'),
    ('R&B');

INSERT INTO songs
    (title, img_url, user_id, genre_id)
VALUES
    ('Hey Jude', 'https://charts-static.billboard.com/img/1968/09/the-beatles-ism-174x174.jpg', 1, 2),
    ('Eye Of The Tiger', 'https://charts-static.billboard.com/img/1982/06/survivor-yca-106x106.jpg', 2, 2),
    ('Rolling In The Deep', 'https://charts-static.billboard.com/img/2010/12/adele-hdy-174x174.jpg', 3, 3),
    ('Lets Get It On', 'https://charts-static.billboard.com/img/1973/07/marvin-gaye-s2l-174x174.jpg', 4, 5),
    ('Another One Bites The Dust', 'https://charts-static.billboard.com/img/1980/08/queen-m21-174x174.jpg', 5, 2),
    ('End Of The Road', 'https://charts-static.billboard.com/img/1992/07/boyz-ii-men-iur-174x174.jpg', 6, 5),
    ('Gold Digger', 'https://charts-static.billboard.com/img/2005/07/kanye-west-irm-106x106.jpg', 7, 1),
    ('Billie Jean', 'https://charts-static.billboard.com/img/1983/01/michael-jackson-9to-174x174.jpg', 8, 3),
    ('I Gotta Feeling', 'https://charts-static.billboard.com/img/2009/06/the-black-eyed-peas-b9u-174x174.jpg', 9, 3),
    ('We Found Love', 'https://charts-static.billboard.com/img/2011/10/rihanna-v3t-174x174.jpg', 10, 3),
    ('Every Breath You Take', 'https://charts-static.billboard.com/img/1983/06/the-police-yho-106x106.jpg', 1, 2),
    ('Night Fever', 'https://charts-static.billboard.com/img/1978/02/bee-gees-uc7-174x174.jpg', 2, 3),
    ('Call Me Maybe', 'https://charts-static.billboard.com/img/2011/10/carly-rae-jepsen-hod-174x174.jpg', 3, 3),
    ('I Will Always Love You', 'https://charts-static.billboard.com/img/1992/11/whitney-houston-m52-174x174.jpg', 4, 5),
    ('Let Me Love You', 'https://charts-static.billboard.com/img/2004/10/mario-bu9-106x106.jpg', 5, 5),
    ('Happy', 'https://charts-static.billboard.com/img/2014/01/pharrell-williams-rbx-174x174.jpg', 7, 3),
    ('Bohemian Rhapsody', 'https://is3-ssl.mzstatic.com/image/thumb/Music1/v4/35/fb/9c/35fb9ce9-875d-4784-bd09-a7f5af6711f6/source/100x100bb.jpg', 10, 2),
    ('Stairway to Heaven', 'https://is4-ssl.mzstatic.com/image/thumb/Music1/v4/b0/43/4d/b0434dcd-2cef-1a9d-a35d-486b8dbe2f2c/source/100x100bb.jpg', 9, 2),
    ('Imagine', 'https://is3-ssl.mzstatic.com/image/thumb/Music4/v4/0b/e0/d5/0be0d532-e4b7-f04a-9636-310374bfde74/source/100x100bb.jpg', 8, 2),
    ('Lose Yourself', 'https://is5-ssl.mzstatic.com/image/thumb/Music/v4/54/4b/00/544b0075-6ef9-5fb6-8040-0bcd9f0d5766/source/100x100bb.jpg', 7, 1),
    ('Walking On a Dream', 'https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/fd/0b/ad/fd0bad0e-79d9-d6b5-c0e7-a1df6b7e2a49/05099930976153.rgb.jpg/170x170bb-85.png', 6, 4),
    ('Fireflies', 'https://is2-ssl.mzstatic.com/image/thumb/Music/5c/bc/1c/mzi.kymnmjfz.jpg/170x170bb-85.png', 5, 4),
    ('Summer', 'https://is4-ssl.mzstatic.com/image/thumb/Music128/v4/9b/a1/93/9ba1931f-0357-634a-a3f4-5e4021ebd056/859716236469_cover.jpg/170x170bb-85.png', 4, 4),
    ('Rappers Delight', 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-138246-20121204-2-sugarhill-gang-306x306-1354644718.jpg', 1, 1),
    ('Juicy', 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-138252-biggie-306x306-1354650845.jpg', 2, 1),
    ('C.R.E.A.M.', 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-138255-wutangclan-306x306-1354651290.jpg', 3, 1),
    ('They Reminisce Over You', 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-138256-peterock-306x306-1354651447.jpg', 1, 1),
    ('Hypnotize', 'https://uclaadmissions.files.wordpress.com/2011/09/picture-2.jpg', 7, 1),
    ('Strobe', 'https://static.thetoptens.com/img/items/549650.jpg', 4, 4),
    ('Around the World', 'https://static.thetoptens.com/img/items/585021.jpg', 4, 4),
    ('Levels', 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/9c/85/03/9c8503ad-fa65-a696-ee7c-298a1e321ac6/source/100x100bb.jpg', 1, 4),
    ('Ghosts N Stuff', 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/af/0e/99/af0e99ef-2086-c1eb-e34b-d8461f75062b/source/100x100bb.jpg', 9, 4);


INSERT INTO favorites
    (user_id, song_id)
VALUES
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
    (5, 5),
    (10, 5),
    (6, 6),
    (7, 6),
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
    (5, 15),
    (3, 16),
    (9, 16),
    (9, 17),
    (1, 17),
    (2, 17),
    (4, 17),
    (5, 17),
    (8, 17),
    (9, 17),
    (10, 17),
    (2, 18),
    (5, 18),
    (1, 19),
    (2, 19),
    (8, 19),
    (9, 19),
    (10, 19),
    (3, 20),
    (4, 20),
    (5, 20),
    (6, 20),
    (7, 20),
    (10, 20),
    (10, 21),
    (2, 21),
    (5, 21),
    (8, 21),
    (1, 22),
    (5, 22),
    (9, 22),
    (1, 23),
    (4, 23),
    (6, 23),
    (8, 23),
    (9, 23),
    (10, 23),
    (10, 24),
    (1, 25),
    (4, 25),
    (8, 25),
    (1, 26),
    (9, 27),
    (8, 28),
    (2, 30),
    (4, 31),
    (5, 32),
    (8, 32);

INSERT INTO comments
    (comment_body, user_id, song_id)
VALUES
    ('great song', 1, 1),
    ('bad song', 2, 3),
    ('i listen to this when i am sad', 3, 5),
    ('i listen to this when i am glad', 5, 9),
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
    ('first', 10, 1),
    ('my ears are bleeding', 3, 16),
    ('my dog can make better music than this', 10, 17),
    ('i like this song', 1, 18),
    ('play this song every morning', 8, 19),
    ('this song reminds me of summer', 6, 20),
    ('best song in the world', 1, 21),
    ('did not like the vocals but the beat was cool', 2, 22),
    ('would not listen to again', 8, 23),
    ('yum i love coffee', 1, 24),
    ('green eggs and ham', 10, 25),
    ('i too, enjoy green eggs and ham', 3, 25),
    ('the first time I heard this song was at my birthday party', 7, 26),
    ('the first time I heard this song was at the dentist', 2, 27),
    ('saw this live, it was great', 10, 28),
    ('this song always gets me pumped', 2, 29),
    ('great song', 2, 31),
    ('spooky song', 4, 32);
