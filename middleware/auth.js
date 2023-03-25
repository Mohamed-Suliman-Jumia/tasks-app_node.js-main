const createError = require("http-errors");

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return next(createError(403, 'A token is required for authentication'))
    }

    try {
        const userData = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = userData;
    } catch (err) {
        return next(createError(401, 'Invalid Token'))
    }
    return next();
};

module.exports = auth;