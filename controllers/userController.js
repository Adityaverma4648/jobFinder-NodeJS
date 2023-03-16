const mongoose = require('mongoose');
const User = require('../model/User');
const generateToken = require("../config/Jwt");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });  // quering rows to ensure unique email
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      firstName,
      lastName,
      email,
      college,
      password,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName : user.lastName,
        email: user.email,
        college: user.college,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });


module.exports = {registerUser};