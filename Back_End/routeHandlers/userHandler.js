const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');
const checkRegistration = require('../middlewares/checkRegistration');

const router = express.Router();
const User = new mongoose.model('User', userSchema);

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'successful',
    });
});

router.post('/signup', checkRegistration, async (req, res) => {
    try {
        const { body } = req;
        const name = typeof (body.name) === 'string'
        && body.name.length > 0
        && body.name.length < 21
            ? body.name : false;

        const phone = typeof (body.phone) === 'string'
        && body.phone.length === 11
        && !Number.isNaN(body.phone)
            ? body.phone : false;

        const password = typeof (req.body.password) === 'string'
        && body.password.length > 5
        && body.password.length < 33
            ? body.password : false;

        if (name && phone && password) {
            const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS * 1);

            const newUser = new User({
                name,
                phone,
                password: hashedPassword,
            });
            const user = await newUser.save();

            const data = {
                name: user.name,
                phone: user.phone,
                _id: user._id,
            };
            res.status(200).json({
                message: 'Created User Successfully!',
                data,
            });
        } else {
            res.status(400).json({
                Error: 'Please provide valid information.',
            });
        }
    } catch {
        res.status(500).json({
            Error: 'Internal server problem',
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { body } = req;

        const phone = typeof (body.phone) === 'string'
        && body.phone.length === 11
        && !Number.isNaN(body.phone)
            ? body.phone : false;

        const password = typeof (req.body.password) === 'string'
        && body.password.length > 5
        && body.password.length < 33
            ? body.password : false;

        if (phone && password) {
            const user = await User.find({ phone: body.phone });
            if (user && user.length > 0) {
                const isValidPassword = await bcrypt.compare(body.password, user[0].password);
                if (isValidPassword) {
                    // create token and send
                    const token = jwt.sign({
                        name: user[0].name,
                        _id: user[0]._id,
                        phone: user[0].phone,
                    }, process.env.JWT_SECRET_KEY);
                    res.status(200).json({
                        token,
                        message: 'Log in successful!',
                    });
                } else {
                    res.status(401).json({
                        error: 'Wrong password.',
                    });
                }
            } else {
                res.status(404).json({
                    error: 'User not registered!',
                });
            }
        } else {
            res.status(400).json({
                Error: 'Please provide valid information.',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.',
        });
    }
});

module.exports = router;
