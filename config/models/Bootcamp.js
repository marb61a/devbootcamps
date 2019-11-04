const mongoose = require("mongoose");

const BootstrapSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters in length"]
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: [50, "Description can not be more than 500 characters in length"]
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "Please use a valid URL with HTTP or HTTPS"
        ]
    },
    
})