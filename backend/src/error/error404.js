const customErrorHandler = require('../error/customError');

module.exports = (req, res, next) => {
    next(customErrorHandler('page not found', 404, false));
}