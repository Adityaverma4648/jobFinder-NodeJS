
const express = require('express');
//  express instance
const app = express();
// DB connect 
const connectDB = require("../DB/connect");
// PORT decision
const PORT = process.env.PORT||5000;

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})

const start = async ()=>{

   try {
       await connectDB();
      app.listen(PORT,console.log(`SERVER STARTED AT ${PORT}`));
   } catch (error) {
       console.log(error);
   }

}
start();


