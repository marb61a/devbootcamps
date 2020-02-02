const path = require('path');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const geocoder = require('../utils/geocoder');

// Middleware functions which will remove some logic
// from within route declarations

// @desc            Get all bootcamps
// @route           GET /api/v1/bootcamps
// @access          Public
exports.getBootcamps = asyncHandler( async(req, res, next) => {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    }
);

// @desc            Get a single bootcamp
// @route           GET /api/v1/bootcamps/:id
// @access          Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
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
    }
);

// @desc            Create a single bootcamp
// @route           POST /api/v1/bootcamps
// @access          Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(200).json({
            success: true,
            data: bootcamp
        });
    }
);

// @desc            Update a bootcamp
// @route           PUT /api/v1/bootcamps/:id
// @access          Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
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
    }
);

// @desc            Delete bootcamp
// @route           DELETE /api/v1/bootcamps/:id
// @access          Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
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
    }
);

// @desc            Get bootcamps within a radius
// @route           GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access          Private
exports.getBootcampsInRadius = asyncHandler(async(req, res, next) => {
    const {zipcode, distance} = req.params;

    // Get the latitude/longtitude from geocoder
    const campLoc = await geocoder.geocode(bootcamp);
    const lat = campLoc[0].latitude;
    const lng = campLoc[0].longtitude;

    // This calcuates the radius using radians 
    // Divide the distance by the radius of the earth
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius] 
            }
        }
    });

    res.status(200)
        .json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
});

// @desc            Upload a photo for a bootcamp
// @route           PUT /api/v1/bootcamps/:id/photo
// @access          Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    
    // Ensure that the review belongs to the user or that the user is admin
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to update this bootcamp`, 401
            )
        );
    }

    if(!req.files) {
        return next(
            new ErrorResponse(`Please upload a file`, 400)
        );
    }

    const file = req.files.file;

    // Ensure that the file is an image
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }
    
    // Check the filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400
            )
        );
    }

    // Create a custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);
            return next(
                new ErrorResponse(
                    `Problem with file upload`, 500
                )
            )
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, {
            photo: file.name
        });

        res.status(200)
            .json({
                success: true,
                data: file.name
            });
    });

});
