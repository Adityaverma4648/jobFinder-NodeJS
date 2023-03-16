const mongoose = require('mongoose');
const User = require('../model/User');
const generateToken = require("../config/Jwt");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
          // const userExists = await User.findOne({ email });

          // if (userExists) {
          //   res.status(400);
          //   throw new Error("User already exists");
          // }
          const user = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName ,
            email : req.body.email ,
            college : req.body.college ,
            password : req.body.password ,
          });
        
          if (user) {
            res.status(201).json({
              "firstName" : firstName,
              "lastName" : lastName,
              "email" : email,
              "college" : college,
              "password" : password,
              token: generateToken(user._id),
            });
          }

  });


module.exports = {registerUser};