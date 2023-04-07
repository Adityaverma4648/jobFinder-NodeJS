const mongoose = require('mongoose');
const AppliedSchema = new mongoose.Schema({
    ApplierEmail : {
          type : String,
          required : true,
    },
    AppliedToEmail : {
        type : String,
        required : true,
    }
},
{
     timestamps: true,
}
)

module.exports= mongoose.model("Applied",AppliedSchema);