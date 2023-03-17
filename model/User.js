const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    userName : {
          type : String,
          required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
        
    },
    designation : {
      type : String,
      required : true,
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

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//  protecting password
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  


userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User",userSchema);