var express = require("express");
var router = express.Router();

const {
  getAllSongs,
  getAllSongsForGenre,
  getAllSongsForUser,
  getOneSong,
  createSong,
  deleteSong
} = require("../db/queries/songsQueries.js");

router.get("/", getAllSongs);
router.get("/genre/:id", getAllSongsForGenre);
router.get("/user/:id", getAllSongsForUser);
router.get("/:id", getOneSong);
router.post("/", createSong);
router.delete("/:id", deleteSong);

module.exports = router;
