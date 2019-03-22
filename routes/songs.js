var express = require("express");
var router = express.Router();

const {
  getAllSongs,
  getAllSongsByPop,
  getAllSongsForGenre,
  getAllSongsForUser,
  getAllSongsForOtherUser,
  getOneSong,
  createSong,
  deleteSong
} = require("../db/queries/songsQueries.js");

router.get("/", getAllSongs);
router.get("/bypop", getAllSongsByPop);
router.get("/genre/:id", getAllSongsForGenre);
router.get("/user/:id", getAllSongsForOtherUser);
router.get("/user", getAllSongsForUser);
router.get("/:id", getOneSong);
router.post("/", createSong);
router.delete("/:id", deleteSong);

module.exports = router;
