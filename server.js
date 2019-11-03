const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

const connectDB = require("./config/db");

// Load the environment variables
dotenv.config({
    path: "./config/config.env"
});

// Connect to the database
connectDB();

// API route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Logging middleware with Morgan
if(process.env.NODE_ENV === 'developmen'){
    app.use("morgan");
}

// Mounts the routers
app.use('/api/v1/bootcamps', bootcamps);

// Open a port which can be specified in the environment 
// variables config file
const PORT = process.env.PORT || 5001;

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