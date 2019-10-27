const express = require("express");
const dotenv = require("dotenv");

// Load the environment variables
dotenv.config({
    path: "./config/config.env"
});

const app = express();

// Routes
app.get('/', (req, res) => {
    
})

// Open a port which can be specified in the environment 
// variables config file
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
