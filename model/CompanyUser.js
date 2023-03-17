const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcryptjs");


const companyUserSchema = new mongoose.Schema({
   
    companyName : {
        type : String,
        required : true
       
    },
    companyAddress : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
        
    },
    password : {
         type : String,
         required : true
    }
},
{
     timestamps: true,
}
)
companyUserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//  protecting password
companyUserSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  

companyUserSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("companyUser",companyUserSchema);