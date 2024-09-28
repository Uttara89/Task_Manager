const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"]
    },

    email : {
        type : String,
        required : [true, "Name is required"],
        unique: true
    },

    password : {
        type : String,
        required : [true, "Name is required"]
    }
})

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    try {
        // Hash the password with a salt of 10 rounds
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;