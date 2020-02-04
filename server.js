const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Load the environment variables
dotenv.config({
    path: "./config/config.env"
});

// Connect to the database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// API route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// For body parsing, no need to install body-parser package
// as it is now included in express
app.use(express.json);

// Logging middleware with Morgan
if(process.env.NODE_ENV === 'developmen'){
    app.use("morgan");
}

// Mounts the routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

// Open a port which can be specified in the environment 
// variables config file
const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.green.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    // CLose the server and exit the process
    server.close(process.exit(1));
});