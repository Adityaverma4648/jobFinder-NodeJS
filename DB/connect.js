const mongoose = require('mongoose');
// const password = "pSMdTF06pZGKiZnp"
const connectDB = ()=>{
    return mongoose.connect("mongodb+srv://AdityaVerma:pSMdTF06pZGKiZnp@jobfinderapi.ucrf8wy.mongodb.net/JobFinderAPI?retryWrites=true&w=majority",{
        useNewUrlParser : true,
        useUnifiedTopology: true,

    });
}

module.exports = connectDB;