const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.userInfo = {
                name: decoded.name,
                _id: decoded._id,
                phone: decoded.phone,
            };
        } else {
            next('Authentication Failure!');
        }
    } catch {
        next('Authentication Failure!');
    }
    next();
};

module.exports = checkLogin;
