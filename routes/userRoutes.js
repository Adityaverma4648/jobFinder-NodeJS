const express = require('express');
const router = express.Router();
const User = require('../model/User'); 
const {
  registerUser
} = require("../controllers/userController");

// router.post('/',registerUser);


module.exports = router;