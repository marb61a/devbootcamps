const express = require("express");

// Initialise the express router
const router = express.Router();

router.get('/', (req, res) => {
    
});

router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Show bootcamp ${req.params.id}`
    });
});

router.post('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Create new bootcamp'
    });
});

router.put('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`
    });
});

router.delete('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`
    });
});

module.exports = router;