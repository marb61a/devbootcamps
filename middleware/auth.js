const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect app routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Set the token from the Bearer token in the header
        token = req.headers.authorization.split(' ')[1];
    }

    // Ensure that the token exists
    if(!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

});
