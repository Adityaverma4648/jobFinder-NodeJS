const { Double } = require('mongodb');
const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    JobName : {
        type : String,
        required : true,
    },
    beginningYear : {
        type : String,
        required : true
    },
    yearOfCompletion : {
        type : String,
        required : true
    },
    Role : {
        type : String,
        required : true
    }
},
{
     timestamps: true,
}
)

module.exports= mongoose.model("Jobs",jobSchema);