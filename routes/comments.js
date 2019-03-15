var express = require("express");
var router = express.Router();

const {
  getAllComments,
  getAllCommentsForSong,
  createComment,
  updateComment,
  deleteComment
} = require("../db/queries/commentsQueries.js");

router.get("/", getAllComments);
router.get("/song/:id", getAllCommentsForSong);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
