const { db } = require("./index.js");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received all users"
      });
    })
    .catch(err => next(err));
};

const getSingleUser = (req, res, next) => {
  const userId = Number(req.params.id);
  db.one("SELECT username FROM users WHERE id=$1", userId)
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data,
        message: "Received one user"
      });
    })
    .catch(err => next(err));
};

const createUser = (req, res, next) => {
  db.none("INSERT INTO users(username) VALUES(${username})", {
    username: req.body.username
  })
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Created new user"
      });
    })
    .catch(err => next(err));
};

const deleteUser = (req, res, next) => {
  const userId = Number(req.params.id);
  db.result("DELETE FROM users WHERE id=$1", userId)
    .then(result => {
      res.status(200).json({
        status: "Success",
        message: "Removed a user",
        result: result
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser
};
