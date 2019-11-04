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
    phone: {
        type: String,
        maxlength: [20, "Phone number can not be more than 20 characters in length"]
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    address: {
        type: String,
        required: [true, "Please add an address"]
    },
    location: {
        // GEOJson
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: "2dsphere"
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
        career: {
            // Array of strings
            type: [String],
            required: true,
            enum: [
                'Web Development',
                'Mobile Development',
                'UI/UX',
                'Data Science',
                'Business',
                'Tester',
                'Other'
            ]
        },
        averageRating: {
            type: Number,
            min: [1, 'Ratings must be at least 1'],
            max: [10, 'Ratings can not be more than 10']
        },
        averageCost: Number,
        
    }
})