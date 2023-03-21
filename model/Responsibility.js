const mongoose = require('mongoose');
const responsibilitySchema = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
    },
    responsibility : {
        type : String,
        required : true,
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

module.exports= mongoose.model("Responsibility",responsibilitySchema);