const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// const password = "pSMdTF06pZGKiZnp"
const connectDB = (uri)=>{
    return mongoose.connect( uri);
}

module.exports = connectDB;