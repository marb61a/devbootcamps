const mongoose = require("mongoose");
const slugify = require("slugify");

const BootcampSchema = new mongoose.Schema({
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
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
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
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
        housing: {
            type: Boolean,
            default: false
        },
        jobAssistance: {
            type: Boolean,
            default: false
        },
        jobGuarantee: {
            type: Boolean,
            default: false
        },
        acceptGi: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Create bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {
        lower: true
    });
    next();
});

// Geocode and create location field
BootcampSchema.pre("save", function(next) {
    const campLoc = await geocoder.geocode(this.address);
    
    this.location = {
        tpye: "Point",
        coordinates: [campLoc[0].longitude, campLoc[0].latitude],
        formattedAddress: campLoc[0].formattedAddress,
        street: campLoc[0].streetName,
        city: campLoc[0].city,
        state: campLoc[0].stateCode,
        zipcode: campLoc[0].zipcode,
        country: campLoc[0].countryCode
    }

    // Do not save address in DB
    this.address = undefined;
    next();
});


module.exports = mongoose.model('Bootcamp', BootcampSchema);