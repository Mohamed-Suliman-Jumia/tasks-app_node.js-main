const generalErrorHandler = function (err, req, res, next) {
    console.error(err.message);
    res.status(err.statusCode || 500).send(err.message);
};

module.exports = { generalErrorHandler };