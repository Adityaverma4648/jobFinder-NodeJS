require("dotenv").config();
const express = require('express');
const exphbs = require('express-handlebars');
const path =  require('path');

// express instance
const app = express();
// DB connect 
const connectDB = require("./config/connect");
// PORT decision
const PORT = process.env.PORT||5000;


//  path to static directory-----------------------------------------------------------------------------------------------------------------------------------------
const staticPath  = path.join(__dirname, '../backend/public');

//  serving static files using built in middleware;
          // app.use(express.static(staticPath));
// -------------------------------------------------------------------------------------------------------------------------------------------------



//  handle bars template engine - dynamic sites are served.............................. --------------------------------------------------------------------------------
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
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


