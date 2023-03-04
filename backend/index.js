require("dotenv").config();
const express = require('express');
// express instance
const app = express();
// DB connect 
const connectDB = require("./config/connect");
// PORT decision
const PORT = process.env.PORT||5000;

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})

app.use('/api',apiRoutes);



const start = async ()=>{
   try {
       await connectDB(process.env.MONGODB_URI);
      app.listen(PORT,console.log(`SERVER STARTED AT ${PORT}`));
   } catch (error) {
       console.log(`Connection failed : ${error}`)
   }

}
start();


