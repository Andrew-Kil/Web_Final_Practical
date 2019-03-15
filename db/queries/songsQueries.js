const { db } = require("./index.js");

const getAllSongs = (req, res, next) => {
  db.any("SELECT * FROM songs")
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
  // getAllSongsForGenre,
  // getAllSongsForUser,
  getOneSong,
  createSong,
  deleteSong
};
