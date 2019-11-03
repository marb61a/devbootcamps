const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // Stop warnings for happening
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
};