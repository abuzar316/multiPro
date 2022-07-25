module.exports = (err, req, res, next) => {
    res.status(err.statusCode || 400).json(err);
}