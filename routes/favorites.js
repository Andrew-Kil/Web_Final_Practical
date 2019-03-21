var express = require("express");
var router = express.Router();

const {
  getAllFavorites,
  // getAllFavoritesForSong,
  getAllFavoritesForUser,
  getAllFavoritersForAnotherUser,
  createFavorite,
  deleteFavorite
} = require("../db/queries/favoritesQueries.js");

router.get("/", getAllFavorites);
// router.get("/song/:id", getAllFavoritesForSong);
router.get("/user/:id", getAllFavoritersForAnotherUser);
router.get("/user", getAllFavoritesForUser);
router.post("/", createFavorite);
router.delete("/", deleteFavorite);

module.exports = router;
