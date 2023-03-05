const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const opportunitySchema = new mongoose.Schema({
    company : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : [true,"role must be mentioned*"]
    } ,
    stipend : {
        type : Number,
        required : [true,"stipend must be mentioned*"]
    },
    skillsRequired : {
         type : String,
         required : [true,"skills Required must be mentioned*"]
    },
    dailyRoles : {
        type :String,
        required : false,
    },
    createdDate : {
        type :Date,
        default : Date.now(),
    },
    roleDuration : {
        type :String,
        default : "1Month",
    }
                   
})

module.exports = mongoose.model('Opportunity',opportunitySchema);