const customErrorHandler = require('../error/customError');

module.exports = (handlers) => {
    return async (req, res, next) => {
        try {
            await handlers(req, res, next);
        } catch (err) {
            // console.log(err)
            next(customErrorHandler(err.message, 400, false));
        }
    }
}