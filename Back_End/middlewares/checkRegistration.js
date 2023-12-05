const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');

const User = new mongoose.model('User', userSchema);

const checkRegistration = async (req, res, next) => {
    const { phone } = req.body;
    try {
        const user = await User.find({ phone });
        if (user && user.length > 0) {
            res.status(400).json({
                message: 'User already registered!',
            });
        } else {
            next();
        }
    } catch {
        next('Registration Failure.');
    }
};

module.exports = checkRegistration;
