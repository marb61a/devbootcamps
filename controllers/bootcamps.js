// Middleware functions which will remove some logic
// from within route declarations
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Show all bootcamps'
    });
};
