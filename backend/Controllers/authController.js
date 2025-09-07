const bcrypt = require('bcrypt');
const UserModel = require("../Models/users");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        // Check if user already exists
        const { name, email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }
        // Create new user
        user = new UserModel({ name, email, password });
        user.password = await bcrypt.hash(password, 10); // hash password
        await user.save();
        res.status(201).json({ message: 'User created successfully', success: true });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message, success: false });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'New User please Signup', success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }
        //now we will generate a token as the email and password is verified.
        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ 
            message: 'Login successful',
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email,
                _id: user._id
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message, success: false });
    }
}

module.exports = { signup, login }; 