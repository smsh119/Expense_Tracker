const express = require('express');

const checkLogin = require('../middlewares/checkLogin');

const router = new express.Router();

router.get('/', checkLogin, (req, res) => {
    res.status(200).json({
        message: 'this is tracker route',
    });
});

module.exports = router;
