const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc            Get courses
// @route           GET /api/v1/courses
// @route           GET /api/v1/bootcamps/:bootcampId/courses
// @access          Public
exports.getCourses = asyncHandler(async(req, res, next) => {
    if(req.params.bootcampId){
        const courses = await Course.finc({
            bootcamp: req.params.bootcampId
        });

        return res.status(200)
            .json({
                success: true,
                count: courses.length,
                data: courses
            });
    } else {
        res.status(200)
            .json(res.advancedResults)
    }
});

// @desc            Get a single course
// @route           GET /api/v1/courses/:id
// @access          Public
exports.getCourse = asyncHandler(async(req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if(!course){
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`),
            404
        );
    }

    res.status(200)
        .json({
            success: true,
            data: course
        });
});
