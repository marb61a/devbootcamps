const express = require('express');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
} = require('../controllers/users');
  
const User = require('../models/User');

const router = express.Router({ mergeParams: true });

module.exports = router;