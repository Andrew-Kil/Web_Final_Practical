const { db } = require("./index.js");

const getAllSongs = (req, res, next) => {
  db.any(
    "SELECT songs.*, genres.genre_name, users.username, json_agg(comments.*) AS comments, (SELECT COUNT (favorites.song_id) AS favorites FROM favorites WHERE songs.id = favorites.song_id) FROM songs JOIN genres ON songs.genre_id = genres.id FULL JOIN comments ON songs.id = comments.song_id JOIN users ON songs.user_id = users.id GROUP BY songs.id, genres.id, users.username ORDER BY songs.id"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received all songs"
      });
    })
    .catch(err => next(err));
};

const getAllSongsByPop = (req, res, next) => {
  db.any(
    "SELECT songs.*, genres.genre_name, users.username, json_agg(comments.*) AS comments, (SELECT COUNT (favorites.song_id) AS favorites FROM favorites WHERE songs.id = favorites.song_id) FROM songs JOIN genres ON songs.genre_id = genres.id FULL JOIN comments ON songs.id = comments.song_id JOIN users ON songs.user_id = users.id GROUP BY songs.id, genres.id, users.username ORDER BY favorites DESC"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received all songs"
      });
    })
    .catch(err => next(err));
};

const getAllSongsForGenre = (req, res, next) => {
  const genreID = Number(req.params.id);

  "SELECT songs.* FROM songs JOIN genres ON songs.genre_id = genres.id WHERE genre_id = $1 ORDER BY songs.id",
    genreID
      .then(data => {
        res.status(200).json({
          status: "Success",
          data: data,
          messsage: "Received one song"
        });
      })
      .catch(err => next(err));
};

const getAllSongsForUser = (req, res, next) => {
  const loggedInUser = 1;
  db.any(
    "SELECT songs.*, genres.genre_name, users.username, json_agg(comments.*) AS comments, (SELECT count(favorites.song_id) AS favorites FROM favorites WHERE songs.id = favorites.song_id) FROM songs JOIN genres ON songs.genre_id = genres.id JOIN comments ON songs.id = comments.song_id JOIN users ON songs.user_id = users.id  WHERE users.id = $1 GROUP BY songs.id, genres.id, users.username",
    loggedInUser
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        messsage: "Received one song"
      });
    })
    .catch(err => next(err));
};

const getAllSongsForOtherUser = (req, res, next) => {
  const userID = Number(req.params.id);
  db.any(
    "SELECT songs.*, genres.genre_name, users.username, json_agg(comments.*) AS comments, (SELECT count(favorites.song_id) AS favorites FROM favorites WHERE songs.id = favorites.song_id) FROM songs JOIN genres ON songs.genre_id = genres.id JOIN comments ON songs.id = comments.song_id JOIN users ON songs.user_id = users.id  WHERE users.id = $1 GROUP BY songs.id, genres.id, users.username",
    userID
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        messsage: "Received one song"
      });
    })
    .catch(err => next(err));
};

const getOneSong = (req, res, next) => {
  const ID = Number(req.params.id);
  db.any("SELECT * FROM songs WHERE songs.id = $1", ID)
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        messsage: "Received one song"
      });
    })
    .catch(err => next(err));
};

const createSong = (req, res, next) => {
  db.none(
    "INSERT INTO songs(title, img_url, user_id, genre_id) VALUES(${title}, ${img_url}, ${user_id}, ${genre_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Created new song"
      });
    })
    .catch(err => next(err));
};

const deleteSong = (req, res, next) => {
  let ID = Number(req.params.id);
  db.result("DELETE FROM songs WHERE id=$1", ID)
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Removed a song"
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllSongs,
  getAllSongsByPop,
  getAllSongsForOtherUser,
  getAllSongsForGenre,
  getAllSongsForUser,
  getOneSong,
  createSong,
  deleteSong
};
