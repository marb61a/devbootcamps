const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    }
});

module.exports = mongoose.model('Course', CourseSchema);