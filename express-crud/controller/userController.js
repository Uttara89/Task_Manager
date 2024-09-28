const User = require("../models/userModel"); // Import the User model
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: "Failed",
                message: "User already exists"
            });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({
            status: "Success",
            data: {
                user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to create user",
            error: e.message
        });
    }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const userList = await User.find(); // Fetch all users

        res.status(200).json({
            status: "Success",
            count: userList.length,
            data: {
                users: userList
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to get all users",
            error: e.message
        });
    }
};

// Get a specific user by ID
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "Success",
            data: {
                user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to get user",
            error: e.message
        });
    }
};
