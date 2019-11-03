const express = require("express");
const dotenv = require("dotenv");

const morgan = require("morgan");

// API route files
const bootcamps = require('./routes/bootcamps');

// Load the environment variables
dotenv.config({
    path: "./config/config.env"
});

const app = express();

// Logging middleware with Morgan
if(process.env.NODE_ENV === 'developmen'){
    app.use("morgan");
}

// Mounts the routers
app.use('/api/v1/bootcamps', bootcamps);

// Open a port which can be specified in the environment 
// variables config file
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
