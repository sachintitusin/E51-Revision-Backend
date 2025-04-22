const express = require("express");
const { addUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// Route to add a user
router.post("/", addUser);

// Route to get all users
router.get("/", getUsers);

module.exports = router;
