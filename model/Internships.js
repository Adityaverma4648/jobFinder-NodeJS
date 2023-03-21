const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
    },
    internshipName : {
        type : String,
        required : true,
    },
    beginningMonth : {
        type : String,
        required : true
    },
    monthOfCompletion : {
        type : String,
        required : true
    },
    yearOfCompletion : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
},
{
     timestamps: true,
}
)

module.exports= mongoose.model("Internships",internshipSchema);