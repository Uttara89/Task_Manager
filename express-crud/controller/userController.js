const User = require("../models/userModel"); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const JWT_SECRET = 'My_jwt_secret'; 

// Login user
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid email or password"
            });
        }

        // Compare the entered password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid email or password"
            });
        }

        // If passwords match, generate a JWT token (optional, for authentication purposes)
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: "Success",
            message: "Login successful",
            token, // Send token back (if using JWT)
            data: {
                user
            }
        });
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: "Login failed",
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
