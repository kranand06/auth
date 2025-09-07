const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // remove whitespace
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // normalize emails
        // match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
        // store hashed password (bcrypt)
    }
}, { timestamps: true });  // adds createdAt and updatedAt automatically

// Export the model
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;