const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
      userEmail : {
          type : String ,
          require : true,
      },
       projectName : {
           type : String,
           required : true,
           unique : true,
      },
      projectDescription : {
          type : String,
          required : true,
      },
      projectLink : {
         type : String,
         required : true,
      }
})

module.exports = mongoose.model("Projects",projectSchema);