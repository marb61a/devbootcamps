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
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key, this will check the code rather than the
    // error name which is MongoError which is shared by several errors
    if(err.code === 11000) {
        const message = "Duplicate field value enetered";
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if(err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map(val => val.message);
            error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
};

module.exports = errorHandler;