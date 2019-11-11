const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    console.log(err.stack);

    // Mongoose bad ObjectId
    if(err.name === "CastError") {
        const message = `Resource with id of ${err.value} has not been found`;
        
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server error'
    });
};

module.exports = errorHandler;