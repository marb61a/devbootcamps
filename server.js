const express = require("express");
const dotenv = require("dotenv");

const logger = require('./middleware/logger');

// API route files
const bootcamps = require('./routes/bootcamps');

// Load the environment variables
dotenv.config({
    path: "./config/config.env"
});

const app = express();

app.use(logger);

// Mounts the routers
app.use('/api/v1/bootcamps', bootcamps);

// Open a port which can be specified in the environment 
// variables config file
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
