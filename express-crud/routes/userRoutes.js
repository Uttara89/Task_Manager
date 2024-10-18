const express = require("express");
const userController = require("../controller/userController"); // Import the userController

const router = express.Router();

// Route for creating a new user and getting all users
router.route("/")
    .post(userController.createUser)   // POST request to create a new user
    .get(userController.getAllUsers);  // GET request to get all users

// Route for getting a specific user by ID
router.route("/:id")
    .get(userController.getOneUser);   // GET request to get a user by ID

// Route for login
router.route("/login")
    .post(userController.loginUser);   // POST request to log in a user

module.exports = router;
