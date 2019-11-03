const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // Stop warnings for happening
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB connected ${conn.connection.host}`.gray.underline.bold);
};

module.exports = connectDB;