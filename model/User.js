const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
          type : String,
          required : true
    },
    lastName : {
        type : String,
        required : true
       
    },
    email : {
        type : String,
        unique : true,
        required : true
        
    },
    college : {
        type : String,
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

userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User",userSchema);