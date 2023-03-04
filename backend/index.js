require("dotenv").config();
const express = require('express');
const exphbs = require('express-handlebars');

// express instance
const app = express();
// DB connect 
const connectDB = require("./config/connect");
// PORT decision
const PORT = process.env.PORT||5000;

//  handle bars engine --------------------------------------------------------------------------------
app.engine('hbs',exphbs({
    defaultLayout : 'main',
    extname : '.hbs'
}));

app.set('view engine','hbs');

//  block ends here-----------------------------------------------------------------------------


app.get("/",(req,res)=>{
    res.send("Hello from backend")
})

// app.use('/api',apiRoutes);



const start = async ()=>{
   try {
       await connectDB(process.env.MONGODB_URI);
      app.listen(PORT,console.log(`SERVER STARTED AT ${PORT}`));
   } catch (error) {
       console.log(`Connection failed : ${error}`)
   }

}
start();


