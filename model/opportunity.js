const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const opportunitySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true,
    },
    companyAddress : {
        type: String,
        required:true,
    },
    role : {
        type : String,
        required : true
    } ,
    stipend : {
        type : Number,
        required : true
    },
    skillsRequired : {
         type : String,
         required : true
    },
    dailyRoles : {
        type :String,
        required : false,
    },
    roleDuration : {
        type :String,
        default : "1Month",
    },
    roleType : {
          type : String,
          required : true,
    }
                   
})

module.exports = mongoose.model('Opportunity',opportunitySchema);