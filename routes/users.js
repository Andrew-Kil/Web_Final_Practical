var express = require("express");
var router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser
} = require("../db/queries/usersQueries.js");

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
