const { db } = require("./index.js");

const getAllGenres = (req, res, next) => {
  db.any("SELECT * FROM genres")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received all genres"
      });
    })
    .catch(err => next(err));
};

const createGenre = (req, res, next) => {
  db.none("INSERT INTO genres(genre_name) VALUES(${genre_name})", {
    username: req.body.genre_name
  })
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Created new genre"
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllGenres,
  createGenre
};
