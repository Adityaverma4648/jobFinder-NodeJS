const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
          type : String,
          default : null,
          
    },
    lastName : {
        type : String,
        default : null,
       
    },
    email : {
        type : String,
        unique : true,
        
    },
    college : {
        type : String,

    },
    password : {
         type : String,
    }
},
{
     timestaps: true,
}
)

userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User",userSchema);