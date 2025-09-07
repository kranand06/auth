const signup = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
const login = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { signup, login }; 