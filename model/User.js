const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
          type : String,
          default : null,
          required : true
    },
    lastName : {
        type : String,
        default : null,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    college : {
        type : String,
        required : true,
    },
    password : {
         type : String,
    }
},
{
     timestaps: true,
}
)

const User = mongoose.model("user",userSchema);

module.exports= User;