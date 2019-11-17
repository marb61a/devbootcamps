const express = require("express");

// Using destructuring to bring in routes from the bootcamp controller file
const{
    getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius
} = require('../controllers/bootcamps');

// Initialise the express router
const router = express.Router();

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

// Attach routes to methods
router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;