const { Double } = require('mongodb');
const mongoose = require('mongoose');
const educationSchema = new mongoose.Schema({
    userEmail : {
          type : String,
          required : true,
    },
    course : {
        type : String,
        required : true
    },
    yearOfCompletion : {
        type : String,
        required : true
    },
    percentage : {
        type : String,
        required : true
    }
},
{
     timestamps: true,
}
)

module.exports= mongoose.model("Education",educationSchema);