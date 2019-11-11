const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

// Middleware functions which will remove some logic
// from within route declarations

// @desc            Get all bootcamps
// @route           GET /api/v1/bootcamps
// @access          Public
exports.getBootcamps = async(req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch(err) {
        next(err);
    }
};

// @desc            Get a single bootcamp
// @route           GET /api/v1/bootcamps/:id
// @access          Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        // If no bootcamp exists
        if(!bootcamp) {
            // Use return to avoid error from the 400 errors clashing
            // which will cause a header already sent error, this is avoided
            // by returning the first one
            return next(
                new ErrorResponse(`Bootcamp with id of ${req.params.id} has not been found`, 404)
            );
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch(err) {
        // Passing the error to next is the suggested way of handling
        // errors in async functions in express
        next(err);
    }
};

// @desc            Create a single bootcamp
// @route           POST /api/v1/bootcamps
// @access          Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        next(err);
    }
};

// @desc            Update a bootcamp
// @route           PUT /api/v1/bootcamps/:id
// @access          Private
exports.updateBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp with id of ${req.params.id} has not been found`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    });
};

// @desc            Delete bootcamp
// @route           DELETE /api/v1/bootcamps/:id
// @access          Private
exports.deleteBootcamp = async(req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp with id of ${req.params.id} has not been found`, 404)
            );
        }
    
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch(err) {
        next(err);
    }
};
