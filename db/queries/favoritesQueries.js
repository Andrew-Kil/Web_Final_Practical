const { db } = require("./index.js");

const getAllFavorites = (req, res, next) => {
  db.any("SELECT * FROM favorites")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received all favorites"
      });
    })
    .catch(err => next(err));
};

// const getAllFavoritesForSong;

const getAllFavoritesForUser = (req, res, next) => {
  db.any(
    "SELECT users.*, (SELECT json_agg(songs) AS favorites FROM favorites JOIN songs ON favorites.song_id = songs.id WHERE favorites.user_id = users.id) FROM users JOIN songs ON users.id = songs.user_id WHERE users.id = 1 GROUP BY users.id"
  )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received all favorites for user"
      });
    })
    .catch(err => next(err));
};

const createFavorite = (req, res, next) => {
  db.none(
    "INSERT INTO favorites(user_id, song_id) VALUES(${user_id}, ${song_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Created new favorite"
      });
    })
    .catch(err => next(err));
};

const deleteFavorite = (req, res, next) => {
  let id = Number(req.params.id);
  db.result("DELETE FROM favorites WHERE id=$1", id)
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Removed a favorite"
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllFavorites,
  // getAllFavoritesForSong,
  getAllFavoritesForUser,
  createFavorite,
  deleteFavorite
};
