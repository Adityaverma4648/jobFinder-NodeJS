const mongoose = require('mongoose');
const workSchema = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
    },
    workName : {
        type : String,
        required : true,
    },
    workDescription : {
        type : String,
        required : true
    },
    workLink : {
        type : String,
        required : true
    }
},
{
     timestamps: true,
}
)

module.exports= mongoose.model("Works",workSchema);