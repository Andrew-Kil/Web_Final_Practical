var express = require("express");
var router = express.Router();

const {
  getAllFavorites,
  getAllFavoritesForSong,
  getAllFavoritesForUser,
  createFavorite,
  deleteFavorite
} = require("../db/queries/favoritesQueries.js");

router.get("/", getAllFavorites);
// router.get("/song/:id", getAllFavoritesForSong);
// router.get("/user/:id", getAllFavoritesForUser);
router.post("/", createFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
