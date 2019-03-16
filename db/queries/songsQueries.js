const { db } = require("./index.js");

const getAllSongs = (req, res, next) => {
  db.any(
    "SELECT songs.*, genres.genre_name, users.username, json_agg(comments.*) AS comments, (SELECT COUNT (favorites.song_id) AS favorites FROM favorites WHERE songs.id = favorites.song_id) FROM songs JOIN genres ON songs.genre_id = genres.id JOIN comments ON songs.id = comments.song_id JOIN users ON songs.user_id = users.id GROUP BY songs.id, genres.id, users.username"
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
    "SELECT songs.*, genres.genre_name, users.username, json_agg(comments.*) AS comments, (SELECT COUNT (favorites.song_id) AS favorites FROM favorites WHERE songs.id = favorites.song_id) FROM songs JOIN genres ON songs.genre_id = genres.id JOIN comments ON songs.id = comments.song_id JOIN users ON songs.user_id = users.id GROUP BY songs.id, genres.id, users.username ORDER BY favorites DESC"
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

// const getAllSongsForGenre;

// const getAllSongsForUser;

const getOneSong = (req, res, next) => {
  const id = Number(req.params.id);
  db.any("SELECT * FROM songs WHERE songs.id = $1", id)
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
  let id = Number(req.params.id);
  db.result("DELETE FROM songs WHERE id=$1", id)
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
  // getAllSongsForGenre,
  // getAllSongsForUser,
  getOneSong,
  createSong,
  deleteSong
};
