const ErrorREsponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    // To avoid sending a separate error in each if statement
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.log(err.stack);

    // Mongoose bad ObjectId
    if(err.name === "CastError") {
        const message = `Resource with id of ${err.value} has not been found`;
        error = new ErrorREsponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
};

module.exports = errorHandler;