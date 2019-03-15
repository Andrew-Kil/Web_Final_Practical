const { db } = require("./index.js");

const getAllComments = (req, res, next) => {
  db.any("SELECT * FROM comments")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received all comments"
      });
    })
    .catch(err => next(err));
};

// const getAllCommentsForSong;

const createComment = (req, res, next) => {
  db.none(
    "INSERT INTO comments(comment_body, user_id, song_id) VALUES(${comment_body}, ${user_id}, ${song_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Created new comment"
      });
    })
    .catch(err => next(err));
};
// const updateComment;

const deleteComment = (req, res, next) => {
  let id = Number(req.params.id);
  db.result("DELETE FROM comments WHERE id=$1", id)
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Removed a comment"
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllComments,
  // getAllCommentsForSong,
  createComment,
  // updateComment,
  deleteComment
};
